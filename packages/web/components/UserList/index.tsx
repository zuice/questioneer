import { FunctionComponent } from 'react';
import { List } from 'semantic-ui-react';

import { User } from '../../types/user/User';
import { UserListItem } from './UserListItem';

interface Props {
  users: User[];
  me: User;
}

export const UserList: FunctionComponent<Props> = ({ users, me }) => {
  const usersFiltered = users.sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <List divided relaxed>
      {usersFiltered.map(user => (
        <UserListItem key={user.id} user={user} me={me} />
      ))}
    </List>
  );
};
