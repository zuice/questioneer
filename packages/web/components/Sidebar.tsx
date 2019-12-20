import { Header, Button, Icon } from 'semantic-ui-react';
import Link from 'next/link';

export const Sidebar = () => (
  <>
    <Header>
      <Header.Content>Questions</Header.Content>
      <Header.Subheader style={{ marginBottom: 10 }}>
        Soon this will have content.
      </Header.Subheader>
      <Link href="/questions/new">
        <Button as="a">
          <Icon name="plus" /> Question
        </Button>
      </Link>
    </Header>
  </>
);
