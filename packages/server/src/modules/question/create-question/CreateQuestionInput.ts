import { InputType, Field } from 'type-graphql';
import { Length } from 'class-validator';

import { Question } from '../../../entities/Question';

@InputType()
export class CreateQuestionInput implements Partial<Question> {
  @Field()
  @Length(12, 500, {
    message: 'Length of the body must be from 12 to 500 characters.',
  })
  body: string;

  @Field({ nullable: true })
  @Length(8, 255)
  tag?: string;

  @Field()
  difficultyId: string;

  @Field()
  topicId: string;
}
