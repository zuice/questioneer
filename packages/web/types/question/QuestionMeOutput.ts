import { Question } from './Question';
import { User } from '../user/User';

export interface QuestionMeOutput {
  question: Question;
  me: User;
}
