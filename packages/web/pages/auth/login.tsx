import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useFormik } from 'formik';
import Router from 'next/router';
import { Form, Input, Button } from 'semantic-ui-react';
import Link from 'next/link';

import { AuthenticateUserOutput } from '../../types/user/AuthenticateUserOutput';
import { AuthenticateUserInput } from '../../types/user/AuthenticateUserInput';
import { AUTHENTICATE_USER } from '../../graphql/mutations/user-mutations';
import { LoginSchema } from '../../schemas/LoginSchema';
import { GET_ME } from '../../graphql/queries/user-queries';
import { MeOutput } from '../../types/user/MeOutput';
import { setAccessToken } from '../../lib/auth';
import { AuthLayout } from '../../components/AuthLayout';
import { InputError } from '../../components/InputError';
import { withApollo } from '../../lib/withApollo';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [authenticateUser] = useMutation<
    AuthenticateUserOutput,
    AuthenticateUserInput
  >(AUTHENTICATE_USER);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async input => {
      setLoading(true);

      try {
        const response = await authenticateUser({
          variables: { input },
          update: (store, { data }) => {
            store.writeQuery<MeOutput>({
              query: GET_ME,
              data: { me: data.authenticateUser.user },
            });
          },
        });

        if (response && response.data) {
          setAccessToken(response.data.authenticateUser.accessToken);
        }

        Router.push('/');
      } catch (e) {
        setLoading(false);

        if (e && e.graphQLErrors.length > 0) {
          e.graphQLErrors[0].extensions.exception.validationErrors.forEach(
            ({
              property,
              constraints,
            }: {
              property: string;
              constraints: { [key: string]: string };
            }) => {
              formik.setFieldError(property, Object.values(constraints)[0]);
            },
          );
        }
      }
    },
  });

  return (
    <AuthLayout action="Login" description="Enter your account details...">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group grouped>
          <Form.Field error={formik.touched.email && !!formik.errors.email}>
            <label htmlFor="email">Email</label>
            <Input
              fluid
              required
              id="email"
              type="email"
              name="email"
              placeholder="john@example.org"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <InputError show={formik.touched.email && formik.errors.email} />
          </Form.Field>
          <Form.Field
            error={formik.touched.password && !!formik.errors.password}
          >
            <label htmlFor="password">Password</label>
            <Input
              fluid
              required
              id="password"
              type="password"
              name="password"
              placeholder="Secret..."
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <InputError
              show={formik.touched.password && formik.errors.password}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group grouped>
          <Form.Field>
            <Button primary loading={loading} disabled={loading} type="submit">
              Submit
            </Button>{' '}
            No account?{' '}
            <Link href="/auth/register">
              <a>Register.</a>
            </Link>
          </Form.Field>
        </Form.Group>
      </Form>
    </AuthLayout>
  );
};

export default withApollo(Login);
