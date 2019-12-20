import { Question } from './Question';
import { User } from '../user/User';

export interface QuestionsMeOutput {
  questions: Question[];
  me: User;
}
