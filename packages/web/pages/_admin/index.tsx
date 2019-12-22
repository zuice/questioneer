import { FunctionComponent } from 'react';

import { User } from '../../types/user/User';
import { AdminLayout } from '../../components/AdminLayout';
import { withApollo } from '../../lib/withApollo';
import { withMe } from '../../lib/withMe';
import { withAdmin } from '../../lib/withAdmin';

interface Props {
  me: User;
}

const Admin: FunctionComponent<Props> = ({ me }) => {
  return <AdminLayout me={me} action="Dashboard" back="/"></AdminLayout>;
};

export default withApollo(withMe(withAdmin(Admin)));
