import * as Yup from 'yup';
import { EditorState } from 'draft-js';

export const CreateQuestionSchema = Yup.object().shape({
  body: Yup.object()
    .notOneOf([EditorState.createEmpty()], 'Required!')
    .required('Required!'),
  tag: Yup.string()
    .min(3, 'Too short!')
    .max(255, 'Too long!'),
  difficultyId: Yup.string().required('Required!'),
  topicId: Yup.string().required('Required!'),
});
