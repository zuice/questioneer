import { InputType, Field } from 'type-graphql';
import { Length, IsEmail } from 'class-validator';

import { User } from '../../../entities/User';
import { IsUnique } from '../../../validation/IsUnique';
import { MatchesProperty } from '../../../validation/MatchesProperty';

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field()
  @Length(8, 255, { message: 'Must be at least 8 characters.' })
  @IsEmail({}, { message: 'Must be a valid email address.' })
  @IsUnique(User, { message: 'Must be unique.' })
  email: string;

  @Field()
  @Length(3, 255, { message: 'Must be at least 8 characters.' })
  firstName: string;

  @Field()
  @Length(3, 255, { message: 'Must be at least 8 characters.' })
  lastName: string;

  @Field()
  @Length(8, 255, { message: 'Must be at least 8 characters.' })
  password: string;

  @Field()
  @Length(8, 255, { message: 'Must be at least 8 characters.' })
  @MatchesProperty('password', { message: 'Must match password field.' })
  passwordConfirm: string;
}
