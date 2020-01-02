import { FunctionComponent } from 'react';
import Head from 'next/head';
import {
  Segment,
  Grid,
  Tab,
  Header,
  Icon,
  List,
  Menu,
  Dropdown,
} from 'semantic-ui-react';
import Link from 'next/link';

import { User } from '../types/user/User';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface Props {
  loading?: boolean;
  me?: User;
  action: string;
  back: string;
}

export const AdminLayout: FunctionComponent<Props> = ({
  children,
  loading,
  me,
  action,
  back,
}) => (
  <>
    <Head>
      <title>Questioneer | Admin | {action} </title>
    </Head>
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
      }}
    >
      <Navbar me={me} />
      <Segment
        basic
        loading={loading}
        style={{ flex: 1, marginTop: 0, paddingTop: 50 }}
      >
        <Grid>
          <Grid.Column mobile={16} tablet={6} computer={4}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={10} computer={12}>
            <Grid>
              <Grid.Column width={16}>
                <Header>
                  <Header.Content>
                    <Link href={back}>
                      <a>
                        <Icon name="arrow left" />
                      </a>
                    </Link>
                    Admin | {action}
                  </Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column width={16}>
                <Menu>
                  <Dropdown item text="Questions">
                    <Dropdown.Menu>
                      <Link href="/_admin/questions">
                        <Dropdown.Item as="a">Index</Dropdown.Item>
                      </Link>
                      <Link href="/_admin/questions/new">
                        <Dropdown.Item as="a">New</Dropdown.Item>
                      </Link>
                      <Link href="/_admin/questions/bulk-new">
                        <Dropdown.Item as="a">Bulk New</Dropdown.Item>
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown item text="Users">
                    <Dropdown.Menu>
                      <Link href="/_admin/users">
                        <Dropdown.Item as="a">Index</Dropdown.Item>
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu>
              </Grid.Column>
            </Grid>
            {children}
          </Grid.Column>
        </Grid>
      </Segment>
      <Footer />
    </div>
  </>
);
