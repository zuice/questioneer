import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import { Header, Grid, Segment, Card, Icon } from 'semantic-ui-react';
import Link from 'next/link';

interface Props {
  action: string;
  description: string;
}

export const AuthLayout: FunctionComponent<Props> = ({
  children,
  action,
  description,
}) => (
  <>
    <Head>
      <title>Questioneer | {action}</title>
    </Head>
    <Grid centered columns={1}>
      <Grid.Row centered>
        <Grid.Column mobile={16} tablet={12} computer={8}>
          <Segment basic style={{ marginTop: 50 }}>
            <Header>
              <Header.Content>
                <h2>Questioneer</h2>
              </Header.Content>
              <Header.Subheader>{action}</Header.Subheader>
            </Header>
          </Segment>
          <Segment basic>
            <Card fluid>
              <Card.Content>
                <Card.Header>
                  <Link href="/">
                    <a>
                      <Icon name="arrow left" />
                    </a>
                  </Link>
                  {action}
                </Card.Header>
                <Card.Description>{description}</Card.Description>
              </Card.Content>
              <Card.Content>{children}</Card.Content>
            </Card>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </>
);
