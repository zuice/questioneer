import { Resolver, Authorized, Mutation, Arg } from 'type-graphql';

import { Question } from '../../../entities/Question';
import { CreateQuestionInput } from './CreateQuestionInput';

@Resolver()
export class CreateQuestionResolver {
  @Mutation(() => Question)
  @Authorized('ADMIN')
  async createQuestion(
    @Arg('input') input: CreateQuestionInput,
  ): Promise<Question> {
    const question = await Question.create({
      ...input,
    }).save();

    return question;
  }
}
