import { NextPageContext } from 'next';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

export type NextPageContextWithApollo = NextPageContext & {
  apolloClient: ApolloClient<NormalizedCacheObject>;
};
