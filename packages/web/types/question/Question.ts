import { QuestionDifficulty } from '../question-difficulty/QuestionDifficulty';
import { QuestionTopic } from '../question-topic/QuestionTopic';
import { Answer } from '../answer/Answer';

export interface Question {
  readonly id: string;
  body?: string;
  tag?: string;
  slug?: string;
  preview?: string;
  difficultyId?: string;
  topicId?: string;
  createdAt?: number;
  updatedAt?: number;
  difficulty?: QuestionDifficulty;
  topic?: QuestionTopic;
  answers: Answer[];
}
