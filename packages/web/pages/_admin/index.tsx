import Error from 'next/error';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';

import { MeOutput } from '../../types/user/MeOutput';
import { GET_ME } from '../../graphql/queries/user-queries';
import { Layout } from '../../components/Layout';
import { withApollo } from '../../lib/withApollo';

const Admin = () => {
  const { data, loading, error } = useQuery<MeOutput>(GET_ME);

  if (loading || error) {
    return <Error statusCode={404} />;
  }

  return (
    <Layout me={data && data.me} action="Admin">
      Welcome to the Admin page. Create question{' '}
      <Link href="/_admin/questions/new">
        <a>here.</a>
      </Link>
    </Layout>
  );
};

export default withApollo(Admin);
