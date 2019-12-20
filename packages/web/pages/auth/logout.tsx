import { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
import { Segment } from 'semantic-ui-react';

import { LOGOUT_USER } from '../../graphql/mutations/user-mutations';
import { setAccessToken } from '../../lib/auth';
import { withApollo } from '../../lib/withApollo';

const Logout = () => {
  const [logoutUser, { loading, client }] = useMutation<Boolean>(LOGOUT_USER);

  useEffect(() => {
    const logout = async () => {
      if (!loading) {
        await logoutUser();
        await client!.resetStore();

        setAccessToken('');

        Router.push('/');
      }
    };

    logout();
  });

  return <Segment basic loading style={{ marginTop: 50 }} />;
};

export default withApollo(Logout);
