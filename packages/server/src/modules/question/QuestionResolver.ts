import { Resolver, Query, Arg, FieldResolver, Root } from 'type-graphql';

import { Question } from '../../entities/Question';
import { QueryQuestionInput } from './QueryQuestionInput';
import { QuestionDifficulty } from '../../entities/QuestionDifficulty';
import { QuestionTopic } from '../../entities/QuestionTopic';

@Resolver(() => Question)
export class QuestionResolver {
  @Query(() => [Question])
  async questions(): Promise<Question[]> {
    const questions = await Question.find();

    return questions;
  }

  @Query(() => Question)
  async question(@Arg('input') input: QueryQuestionInput): Promise<Question> {
    const question = await Question.findOne({ where: { ...input } });

    return question!;
  }

  @FieldResolver(() => QuestionDifficulty)
  async difficulty(@Root() root: Question): Promise<QuestionDifficulty> {
    const questionDifficulty = await QuestionDifficulty.findOne({
      where: { id: root.difficultyId },
    });

    return questionDifficulty || new QuestionDifficulty();
  }

  @FieldResolver(() => QuestionTopic)
  async topic(@Root() root: Question): Promise<QuestionTopic> {
    const questionTopic = await QuestionTopic.findOne({
      where: { id: root.topicId },
    });

    return questionTopic || new QuestionTopic();
  }
}
