import { Resolver, Query, Authorized } from 'type-graphql';

import { User } from '../../entities/User';
import { UserOutput } from './UserOutput';

@Resolver()
export class UserResolver {
  @Query(() => [UserOutput])
  @Authorized('ADMIN')
  async users(): Promise<UserOutput[]> {
    const users = await User.find();

    return users;
  }
}
