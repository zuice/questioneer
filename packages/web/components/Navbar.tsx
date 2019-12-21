import { FunctionComponent, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { Menu, Dropdown } from 'semantic-ui-react';
import Link from 'next/link';

import { User } from '../types/user/User';
import { LOGOUT_USER } from '../graphql/mutations/user-mutations';
import { setAccessToken } from '../lib/auth';

interface Props {
  me?: User;
}

const checkActive = (activePath: string, path: string) => {
  if (activePath === '/' && path === '/') {
    return true;
  }

  if (activePath.indexOf(path) > -1) {
    if (path === '/') {
      return false;
    }

    return true;
  }

  return false;
};

export const Navbar: FunctionComponent<Props> = ({ me }) => {
  let authComponent: ReactElement;
  let unauthComponent: ReactElement;
  const [logout, { client }] = useMutation<boolean>(LOGOUT_USER);
  const router = useRouter();

  if (me) {
    authComponent = (
      <Menu.Menu position="right">
        <Dropdown item text={me.email}>
          <Dropdown.Menu>
            <Dropdown.Header>Account</Dropdown.Header>
            {me.role === 'ADMIN' ? (
              <Link href="/_admin">
                <Dropdown.Item as="a">Admin</Dropdown.Item>
              </Link>
            ) : null}
            <Dropdown.Item
              as="a"
              onClick={async () => {
                await logout();
                await client?.clearStore();

                setAccessToken('');

                if (router.pathname !== '/') {
                  router.push('/');
                } else {
                  router.reload();
                }
              }}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    );
  }

  if (!me) {
    unauthComponent = (
      <Menu.Menu position="right">
        <Dropdown item text="Account">
          <Dropdown.Menu>
            <Dropdown.Header>Account</Dropdown.Header>
            <Link href="/auth/login">
              <Dropdown.Item as="a">Login</Dropdown.Item>
            </Link>
            <Link href="/auth/register">
              <Dropdown.Item as="a">Register</Dropdown.Item>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    );
  }

  return (
    <Menu pointing secondary fixed="top" style={{ background: '#fff' }}>
      <Link href="/">
        <Menu.Item
          name="Home"
          as="a"
          active={checkActive(router.pathname, '/')}
        />
      </Link>
      <Link href="/questions">
        <Menu.Item
          name="Questions"
          as="a"
          active={checkActive(router.pathname, '/questions')}
        />
      </Link>
      {authComponent}
      {unauthComponent}
    </Menu>
  );
};
