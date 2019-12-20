import { InputType, Field } from 'type-graphql';
import { Length } from 'class-validator';

import { User } from '../../../entities/User';
import { MatchesDataProperty } from '../../../validation/MatchesDataProperty';

@InputType()
export class AuthenticateUserInput implements Partial<User> {
  @Field()
  @Length(8, 255, { message: 'Must be at least 8 characters.' })
  email: string;

  @Field()
  @MatchesDataProperty(User, 'email', true, {
    message: 'Invalid credentials.',
  })
  @Length(8, 255, { message: 'Must be at least 8 characters.' })
  password: string;
}
