import { NextPage } from 'next';
import { useQuery } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-client';

import { NextPageContextWithApollo } from '../types/NextPageContextWithApollo';
import { User } from '../types/user/User';
import { MeOutput } from '../types/user/MeOutput';
import { GET_ME } from '../graphql/queries/user-queries';

type NextPageContextWithMe = NextPageContextWithApollo & {
  me: User;
  meError: ApolloError;
};

export const withMe = (PageComponent: NextPage<NextPageContextWithMe>) => {
  const WithMe: NextPage<
    NextPageContextWithApollo,
    NextPageContextWithMe
  > = pageProps => {
    const { data, error } = useQuery<MeOutput>(GET_ME);

    return (
      <PageComponent
        {...pageProps}
        me={data ? data.me : null}
        meError={error}
      />
    );
  };

  return WithMe;
};
