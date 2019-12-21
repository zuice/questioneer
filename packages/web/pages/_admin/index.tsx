import { FunctionComponent } from 'react';
import Link from 'next/link';

import { User } from '../../types/user/User';
import { Layout } from '../../components/Layout';
import { withApollo } from '../../lib/withApollo';
import { withMe } from '../../lib/withMe';
import { withAdmin } from '../../lib/withAdmin';

interface Props {
  me: User;
}

const Admin: FunctionComponent<Props> = ({ me }) => {
  return (
    <Layout me={me} action="Admin">
      Welcome to the Admin page. Create question{' '}
      <Link href="/_admin/questions/new">
        <a>here.</a>
      </Link>
    </Layout>
  );
};

export default withApollo(withMe(withAdmin(Admin)));
