import { QuestionDifficulty } from '../question-difficulty/QuestionDifficulty';
import { QuestionTopic } from '../question-topic/QuestionTopic';
import { User } from '../user/User';

export interface DifficultyTopicMeOutput {
  questionDifficulties: QuestionDifficulty[];
  questionTopics: QuestionTopic[];
  me: User;
}
