import { ObjectType, Field } from 'type-graphql';

import { UserOutput } from '../UserOutput';

@ObjectType()
export class AuthenticateUserOutput {
  @Field()
  user: UserOutput;

  @Field()
  accessToken: string;
}
