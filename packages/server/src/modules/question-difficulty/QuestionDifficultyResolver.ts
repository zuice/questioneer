import { Resolver, Query } from 'type-graphql';

import { QuestionDifficulty } from '../../entities/QuestionDifficulty';

@Resolver()
export class QuestionDifficultyResolver {
  @Query(() => [QuestionDifficulty])
  async questionDifficulties(): Promise<QuestionDifficulty[]> {
    const questionDifficulties = await QuestionDifficulty.find();

    return questionDifficulties;
  }
}
