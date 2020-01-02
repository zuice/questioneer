import { FunctionComponent } from 'react';
import { useFetch } from 'use-http';
import { useFormik, FormikErrors } from 'formik';
import { Button, Form, Message } from 'semantic-ui-react';

import { User } from '../../../types/user/User';
import { QuestionBulkInput } from '../../../types/question/QuestionBulkInput';
import { getAccessToken } from '../../../lib/auth';
import { AdminLayout } from '../../../components/AdminLayout';
import { FileInput } from '../../../components/FileInput';
import { InputError } from '../../../components/InputError';
import { withApollo } from '../../../lib/withApollo';
import { withMe } from '../../../lib/withMe';
import { withAdmin } from '../../../lib/withAdmin';

interface Props {
  me: User;
}

const BulkNewQuestion: FunctionComponent<Props> = ({ me }) => {
  const { loading, error, post } = useFetch<QuestionBulkInput>(
    process.env.NODE_ENV === 'production'
      ? 'https://data.questioneer.jeffa.dev/'
      : 'http://localhost:4002/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getAccessToken()}`,
      },
    },
  );
  const formik = useFormik<{ file: File }>({
    initialValues: {
      file: null,
    },
    initialErrors: {
      file: '',
    },
    validate: input => {
      const errors: { file?: string } = {};

      if (!input.file) {
        errors.file = 'Required!';
      }

      if (input.file && input.file.type !== 'application/json') {
        errors.file = 'Must be of type json.';
      }

      return errors;
    },
    onSubmit: async input => {
      const reader = new FileReader();
      reader.readAsText(input.file, 'UTF-8');
      reader.onload = async event => {
        const body = {
          input: { file: JSON.parse(event.target.result as string) },
        };
        const response = await post(body);

        console.log(response);
      };
    },
  });

  return (
    <AdminLayout me={me} action="Bulk New Question" back="/_admin/questions">
      {error ? (
        <Message negative>
          <Message.Header>Error!</Message.Header>
          <Message.Content>{error.message}</Message.Content>
        </Message>
      ) : null}
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group grouped>
          <Form.Field error={formik.touched.file && !!formik.errors.file}>
            <FileInput
              id="file"
              name="file"
              onChange={file => {
                formik.setFieldValue('file', file);
              }}
            />
            <InputError
              show={
                formik.touched.file &&
                (formik.errors.file as FormikErrors<string>)
              }
            />
          </Form.Field>
        </Form.Group>
        <Form.Group grouped>
          <Form.Field>
            <Button loading={loading} disabled={loading} type="submit">
              Submit
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>
    </AdminLayout>
  );
};

export default withApollo(withMe(withAdmin(BulkNewQuestion)));
