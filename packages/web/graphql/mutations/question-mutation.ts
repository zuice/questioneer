import gql from 'graphql-tag';

export const CREATE_QUESTION = gql`
  mutation CreateQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      id
    }
  }
`;
