import { QuestionDifficulty } from '../question-difficulty/QuestionDifficulty';
import { QuestionTopic } from '../question-topic/QuestionTopic';

export interface Question {
  readonly id: string;
  body?: string;
  tag?: string;
  slug?: string;
  preview?: string;
  difficultyId?: string;
  topicId?: string;
  createdAt?: string;
  updatedAt?: string;
  difficulty?: QuestionDifficulty;
  topic?: QuestionTopic;
}
