import { ApolloError } from 'apollo-client';
import { NextPage } from 'next';
import Error from 'next/error';

import { User } from '../types/user/User';
import { NextPageContextWithApollo } from '../types/NextPageContextWithApollo';

type NextPageContextWithMe = NextPageContextWithApollo & {
  me: User;
  meError: ApolloError;
};

export const withAdmin = (
  PageComponent: NextPage<NextPageContextWithMe, NextPageContextWithMe>,
) => {
  const WithAuth: NextPage<
    NextPageContextWithMe,
    NextPageContextWithMe
  > = pageProps => {
    const { me, meError } = pageProps;

    if (!meError && me && me.role === 'ADMIN') {
      return <PageComponent {...pageProps} />;
    }

    return <Error statusCode={404} />;
  };

  return WithAuth;
};
