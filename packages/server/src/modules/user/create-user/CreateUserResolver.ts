import { Resolver, Mutation, Arg } from 'type-graphql';

import { User } from '../../../entities/User';
import { CreateUserInput } from './CreateUserInput';
import { UserOutput } from '../UserOutput';

@Resolver()
export class CreateUserResolver {
  @Mutation(() => UserOutput)
  async createUser(@Arg('input') input: CreateUserInput): Promise<UserOutput> {
    const user = await User.create(input).save();

    return user;
  }
}
