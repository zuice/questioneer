import gql from 'graphql-tag';

export const GET_ME = gql`
  query {
    me {
      id
      email
      firstName
      lastName
      role
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      id
      email
      firstName
      lastName
      role
      createdAt
      updatedAt
    }
  }
`;
