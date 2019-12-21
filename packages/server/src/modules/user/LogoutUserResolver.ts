import { Resolver, Authorized, Mutation, Ctx } from 'type-graphql';

import { MyContext } from '../../types/MyContext';
import { sendRefreshToken } from '../../lib/auth';

@Resolver()
export class LogoutUserResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async logoutUser(@Ctx() ctx: MyContext) {
    sendRefreshToken(ctx.res, '');

    return true;
  }
}
