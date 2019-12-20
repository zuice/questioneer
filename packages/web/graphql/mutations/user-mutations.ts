import gql from 'graphql-tag';

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
