import gql from 'graphql-tag';

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input)
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;

export const AUTHENTICATE_USER = gql`
  mutation AuthenticateUser($input: AuthenticateUserInput!) {
    authenticateUser(input: $input) {
      user {
        id
        email
        firstName
        lastName
        role
      }
      accessToken
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation {
    logoutUser
  }
`;
