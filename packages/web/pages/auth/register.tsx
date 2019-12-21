import { useState } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { useFormik } from 'formik';
import Router from 'next/router';
import Link from 'next/link';

import { CreateUserOutput } from '../../types/user/CreateUserOutput';
import { CreateUserInput } from '../../types/user/CreateUserInput';
import { CREATE_USER } from '../../graphql/mutations/user-mutations';
import { RegisterSchema } from '../../schemas/RegisterSchema';
import { AuthLayout } from '../../components/AuthLayout';
import { InputError } from '../../components/InputError';
import { withApollo } from '../../lib/withApollo';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [createUser] = useMutation<CreateUserOutput, CreateUserInput>(
    CREATE_USER,
  );
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async input => {
      setLoading(true);

      try {
        await createUser({
          variables: { input },
        });

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
    <AuthLayout action="Register" description="Enter your account details...">
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
            error={formik.touched.firstName && !!formik.errors.firstName}
          >
            <label htmlFor="firstName">First Name</label>
            <Input
              fluid
              required
              id="firstName"
              type="text"
              name="firstName"
              placeholder="John"
              value={formik.values.firstName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <InputError
              show={formik.touched.firstName && formik.errors.firstName}
            />
          </Form.Field>
          <Form.Field
            error={formik.touched.lastName && !!formik.errors.lastName}
          >
            <label htmlFor="lastName">Last Name</label>
            <Input
              fluid
              required
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Smith"
              value={formik.values.lastName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <InputError
              show={formik.touched.lastName && formik.errors.lastName}
            />
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
            />{' '}
            <InputError
              show={formik.touched.password && formik.errors.password}
            />
          </Form.Field>
          <Form.Field
            error={
              formik.touched.passwordConfirm && !!formik.errors.passwordConfirm
            }
          >
            <label htmlFor="passwordConfirm">Password Confirm</label>
            <Input
              fluid
              required
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              placeholder="Secret..."
              value={formik.values.passwordConfirm}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <InputError
              show={
                formik.touched.passwordConfirm && formik.errors.passwordConfirm
              }
            />
          </Form.Field>
        </Form.Group>
        <Form.Group grouped>
          <Form.Field>
            <Button primary loading={loading} disabled={loading} type="submit">
              Submit
            </Button>{' '}
            Already have an account?{' '}
            <Link href="/auth/login">
              <a>Login.</a>
            </Link>
          </Form.Field>
        </Form.Group>
      </Form>
    </AuthLayout>
  );
};

export default withApollo(Register);
