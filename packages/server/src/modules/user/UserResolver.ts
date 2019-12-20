import { Resolver, Query } from 'type-graphql';

import { User } from '../../entities/User';
import { UserOutput } from './UserOutput';

// TODO: Temporary (delete)
@Resolver()
export class UserResolver {
  @Query(() => [UserOutput])
  async users(): Promise<UserOutput[]> {
    const users = await User.find();

    return users;
  }
}
