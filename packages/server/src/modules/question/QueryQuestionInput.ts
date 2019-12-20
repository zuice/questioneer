import { Field, InputType } from 'type-graphql';

import { Question } from '../../entities/Question';

@InputType()
export class QueryQuestionInput implements Partial<Question> {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  slug?: string;
}
