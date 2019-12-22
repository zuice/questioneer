import { FunctionComponent, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useFormik } from 'formik';
import { Modal, List, Button } from 'semantic-ui-react';

import { User } from '../../types/user/User';
import { UpdateUserInput } from '../../types/user/UpdateUserInput';
import { Select } from '../Select';
import { formatDate } from '../../lib/formatDate';
import { UPDATE_USER } from '../../graphql/mutations/user-mutations';

interface Props {
  user: User;
  me: User;
}

export const UserListItem: FunctionComponent<Props> = ({ user, me }) => {
  const [fieldValue, setFieldValue] = useState({ field: null, value: null });
  const [showModal, setShowModal] = useState(false);
  const [updateUser] = useMutation<boolean, UpdateUserInput>(UPDATE_USER);
  const formik = useFormik({
    initialValues: {
      role: user.role,
    },
    onSubmit: input => {
      updateUser({ variables: { input: { ...input, id: user.id } } });
    },
  });

  return (
    <List.Item>
      <Modal closeOnDimmerClick open={showModal} size="tiny" centered={false}>
        <Modal.Header>Change {user.email}'s role?</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            Changing their role could give them access to sensitive information.
            Are you sure you'd like to go through with it?
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button
            primary
            onClick={() => {
              setShowModal(false);

              formik.setFieldValue(fieldValue.field, fieldValue.value);
              formik.handleSubmit();
            }}
          >
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
      <List.Content floated="right">
        <Select
          id="role"
          name="role"
          options={[
            { key: 'ADMIN', text: 'Admin', value: 'ADMIN' },
            { key: 'NORMAL', text: 'Normal', value: 'NORMAL' },
          ]}
          placeholder="Role..."
          value={formik.values.role}
          disabled={user.id === me.id}
          onBlur={formik.handleBlur}
          onChange={(field, value) => {
            setFieldValue({ field, value });
            setShowModal(true);
          }}
        />{' '}
        <Button negative icon="times" disabled={user.id === me.id} />
      </List.Content>
      <List.Icon name="user" size="big" verticalAlign="middle" />
      <List.Content>
        <>
          <List.Header as="a">{user.email}</List.Header>
          <List.Description as="a">
            Updated {formatDate(user.updatedAt)}
          </List.Description>
        </>
      </List.Content>
    </List.Item>
  );
};
