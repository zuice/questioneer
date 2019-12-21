import { Query, Authorized, Ctx } from 'type-graphql';
import { verify } from 'jsonwebtoken';

import { UserOutput } from './UserOutput';
import { MyContext } from '../../types/MyContext';
import { User } from '../../entities/User';

export class MeResolver {
  @Query(() => UserOutput)
  @Authorized()
  async me(@Ctx() ctx: MyContext): Promise<UserOutput> {
    const authorization = ctx.req.headers['authorization'] as string;

    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      userId: string;
    };
    const user = await User.findOne(payload.userId);

    return user!;
  }
}
