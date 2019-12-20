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
