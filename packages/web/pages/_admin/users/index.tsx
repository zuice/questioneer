import { FunctionComponent } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { User } from '../../../types/user/User';
import { UsersOutput } from '../../../types/user/UsersOutput';
import { GET_USERS } from '../../../graphql/queries/user-queries';
import { AdminLayout } from '../../../components/AdminLayout';
import { UserList } from '../../../components/UserList';
import { withApollo } from '../../../lib/withApollo';
import { withMe } from '../../../lib/withMe';
import { withAdmin } from '../../../lib/withAdmin';

interface Props {
  me: User;
}

const Users: FunctionComponent<Props> = ({ me }) => {
  const { data, loading } = useQuery<UsersOutput>(GET_USERS);

  return (
    <AdminLayout loading={loading} me={me} action="Users" back="/_admin">
      <UserList users={data ? data.users : []} me={me!} />
    </AdminLayout>
  );
};

export default withApollo(withMe(withAdmin(Users)));
