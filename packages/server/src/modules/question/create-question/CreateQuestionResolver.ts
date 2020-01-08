import { Resolver, Authorized, Mutation, Arg, Ctx } from 'type-graphql';

import { Question } from '../../../entities/Question';
import { MyContext } from '../../../types/MyContext';
import { CreateQuestionInput } from './CreateQuestionInput';

@Resolver()
export class CreateQuestionResolver {
  @Mutation(() => Question)
  @Authorized('ADMIN')
  async createQuestion(
    @Ctx() ctx: MyContext,
    @Arg('input') input: CreateQuestionInput,
  ): Promise<Question> {
    const { userId } = ctx.payload!;
    const question = await Question.create({
      userId,
      ...input,
    }).save();

    return question;
  }
}
