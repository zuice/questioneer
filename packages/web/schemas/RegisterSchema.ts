import * as Yup from 'yup';

export const RegisterSchema = Yup.object({
  email: Yup.string()
    .min(8)
    .required('Email is required!'),
  password: Yup.string()
    .min(8, 'Password must be 8 at least characters.')
    .required('Password is required!'),
  passwordConfirm: Yup.string()
    .min(8, 'Password Confirmation must be 8 at least characters.')
    .required('Password Confirmation is required!'),
});
