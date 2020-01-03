import gql from 'graphql-tag';

export const GET_QUESTIONS = gql`
  query {
    questions {
      id
      body
      slug
      preview
      createdAt
      updatedAt
      answers {
        id
        body
        updatedAt
        createdAt
      }
      difficulty {
        id
      }
      topic {
        id
      }
    }
  }
`;

export const GET_QUESTIONS_ME = gql`
  query {
    questions {
      id
      body
      slug
      preview
      createdAt
      updatedAt
      answers {
        id
        body
        updatedAt
        createdAt
      }
      difficulty {
        id
      }
      topic {
        id
      }
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

export const GET_QUESTION = gql`
  query GetQuestion($input: QueryQuestionInput!) {
    question(input: $input) {
      id
      body
      slug
      preview
      createdAt
      updatedAt
      answers {
        id
        body
        updatedAt
        createdAt
      }
      difficulty {
        id
      }
      topic {
        id
      }
    }
  }
`;
