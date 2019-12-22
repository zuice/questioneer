import { InputType, Field } from 'type-graphql';

import { User } from '../../../entities/User';

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field()
  id: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  role?: 'NORMAL' | 'ADMIN';
}
