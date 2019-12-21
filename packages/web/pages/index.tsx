import { FunctionComponent } from 'react';

import { Layout } from '../components/Layout';
import { withApollo } from '../lib/withApollo';
import { User } from '../types/user/User';
import { withMe } from '../lib/withMe';

interface Props {
  me: User;
}

const Dashboard: FunctionComponent<Props> = ({ me }) => (
  <Layout loading={false} me={me} action="Dashboard">
    {me ? me.email : 'Not logged in.'}
  </Layout>
);

export default withApollo(withMe(Dashboard));
