import { ObjectType, Field } from 'type-graphql';

import { User } from '../../entities/User';

@ObjectType()
export class UserOutput implements Partial<User> {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  role: 'ADMIN' | 'NORMAL';
}
