export interface CreateUserInput {
  input: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordConfirm: string;
  };
}
