import { Resolver, Mutation, Authorized, Arg } from 'type-graphql';

import { UpdateUserInput } from './UpdateUserInput';
import { User } from '../../../entities/User';

@Resolver()
export class UpdateUserResolver {
  @Mutation(() => Boolean)
  @Authorized('ADMIN')
  async updateUser(@Arg('input') input: UpdateUserInput): Promise<Boolean> {
    const { id } = input;

    delete input.id;

    await User.update(id, { ...input });

    return true;
  }
}
