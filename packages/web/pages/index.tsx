import { MeOutput } from '../types/user/MeOutput';
import { GET_ME } from '../graphql/queries/user-queries';
import { Layout } from '../components/Layout';
import { withApollo } from '../lib/withApollo';
import { useQuery } from '@apollo/react-hooks';

const Dashboard = () => {
  const { data, loading } = useQuery<MeOutput>(GET_ME, {
    fetchPolicy: 'cache-first',
  });

  return (
    <Layout loading={loading} me={data ? data.me : null} action="Dashboard">
      {data ? data.me.email : 'Not logged in.'}
    </Layout>
  );
};

export default withApollo(Dashboard);
