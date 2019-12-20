import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import nextCookie from 'next-cookies';

import { getAccessToken, setAccessToken } from './auth';

const isServer = () => !process.browser;

export function withApollo(PageComponent: any, { ssr = true } = {}) {
  const WithApollo = ({
    apolloClient,
    serverAccessToken,
    apolloState,
    ...pageProps
  }: any) => {
    if (!isServer() && !getAccessToken()) {
      setAccessToken(serverAccessToken);
    }

    const client =
      (apolloClient as ApolloClient<NormalizedCacheObject>) ||
      initApolloClient(apolloState);

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} apolloClient={client} />
      </ApolloProvider>
    );
  };

  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: any) => {
      const { AppTree, res } = ctx;

      let serverAccessToken = '';

      if (isServer()) {
        const { jid } = nextCookie(ctx);

        if (jid && jid !== '') {
          try {
            const response = await fetch(
              `${process.env.GRAPHQL_URL ||
                'https://api.questioneer.jeffa.dev/'}refresh_token`,
              {
                method: 'POST',
                credentials: 'include',
                headers: {
                  cookie: `jid=${jid}`,
                },
              },
            );

            const data = await response.json();

            serverAccessToken = data.accessToken;
          } catch (_) {}
        }
      }

      const apolloClient = (ctx.apolloClient = initApolloClient(
        {},
        serverAccessToken,
      ));

      const pageProps = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(ctx)
        : {};

      if (typeof window === 'undefined') {
        if (res && res.finished) {
          return {};
        }

        if (ssr) {
          try {
            const { getDataFromTree } = await import('@apollo/react-ssr');

            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
                client={apolloClient}
                apolloClient={apolloClient}
              />,
            );
          } catch (error) {
            console.error('Error while running `getDataFromTree`', error);
          }
        }

        Head.rewind();
      }

      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
        serverAccessToken,
      };
    };
  }

  return WithApollo;
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

function initApolloClient(
  initState: any,
  serverAccessToken?: string,
): ApolloClient<NormalizedCacheObject> {
  if (isServer()) {
    return createApolloClient(initState, serverAccessToken);
  }

  if (!apolloClient) {
    apolloClient = createApolloClient(initState);
  }

  return apolloClient;
}

function createApolloClient(initialState = {}, serverAccessToken?: string) {
  const httpLink = new HttpLink({
    uri: `${process.env.GRAPHQL_URL ||
      'https://api.questioneer.jeffa.dev/'}graphql`,
    credentials: 'include',
    fetch,
  });

  const refreshLink = new TokenRefreshLink({
    accessTokenField: 'accessToken',
    isTokenValidOrUndefined: () => {
      const token = getAccessToken();

      if (!token) {
        return true;
      }

      try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
          return false;
        } else {
          return true;
        }
      } catch {
        return false;
      }
    },
    fetchAccessToken: () => {
      return fetch(
        `${process.env.GRAPHQL_URL ||
          'https://api.questioneer.jeffa.dev/'}refresh_token`,
        {
          method: 'POST',
          credentials: 'include',
        },
      );
    },
    handleFetch: accessToken => {
      setAccessToken(accessToken);
    },
    handleError: err => {
      console.warn('Your refresh token is invalid. Try to relogin');
      console.error(err);
    },
  });

  const authLink = setContext((_request, { headers }) => {
    const token = isServer() ? serverAccessToken : getAccessToken();
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log(graphQLErrors);
    console.log(networkError);
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([refreshLink, authLink, errorLink, httpLink]),
    cache: new InMemoryCache().restore(initialState),
  });
}
