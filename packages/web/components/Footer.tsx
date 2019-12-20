import { Segment } from 'semantic-ui-react';

export const Footer = () => (
  <Segment basic tertiary>
    © Copyright {new Date().getFullYear()}
  </Segment>
);
