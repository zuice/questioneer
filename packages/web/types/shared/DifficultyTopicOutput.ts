import { QuestionDifficulty } from '../question-difficulty/QuestionDifficulty';
import { QuestionTopic } from '../question-topic/QuestionTopic';

export interface DifficultyTopicOutput {
  questionDifficulties: QuestionDifficulty[];
  questionTopics: QuestionTopic[];
}
