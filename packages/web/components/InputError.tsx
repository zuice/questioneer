import { FunctionComponent } from 'react';
import { Icon } from 'semantic-ui-react';

interface Props {
  show: string | null;
}

export const InputError: FunctionComponent<Props> = ({ show }) => {
  if (show) {
    return (
      <span style={{ color: 'red' }}>
        <Icon name="exclamation" /> {show}
      </span>
    );
  }

  return null;
};
