import { Resolver, Mutation, Authorized, Ctx } from 'type-graphql';

import { MyContext } from '../../types/MyContext';
import { sendRefreshToken } from '../../lib/auth';

@Resolver()
export class LogoutUserResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async logoutUser(@Ctx() ctx: MyContext) {
    sendRefreshToken(ctx.res, '');

    return true;
  }
}
