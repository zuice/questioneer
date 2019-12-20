import gql from 'graphql-tag';

export const GET_DIFFICULTIES_TOPICS_ME = gql`
  query {
    questionDifficulties {
      id
      title
    }
    questionTopics {
      id
      title
    }
    me {
      id
      email
      firstName
      lastName
      role
    }
  }
`;

export const GET_DIFFICULTIES_TOPICS = gql`
  query {
    questionDifficulties {
      id
      title
    }
    questionTopics {
      id
      title
    }
  }
`;
