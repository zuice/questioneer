import { FunctionComponent } from 'react';
import Head from 'next/head';
import { Segment, Grid } from 'semantic-ui-react';

import { User } from '../types/user/User';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface Props {
  loading?: boolean;
  me?: User;
  action: string;
}

export const Layout: FunctionComponent<Props> = ({
  children,
  loading,
  me,
  action,
}) => {
  return (
    <>
      <Head>
        <title>Questioneer | {action}</title>
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
              {children}
            </Grid.Column>
          </Grid>
        </Segment>
        <Footer />
      </div>
    </>
  );
};
