import { Query, Authorized, Ctx } from 'type-graphql';
import { verify } from 'jsonwebtoken';

import { UserOutput } from './UserOutput';
import { MyContext } from '../../types/MyContext';
import { User } from '../../entities/User';

export class MeResolver {
  @Query(() => UserOutput)
  @Authorized('NORMAL', 'ADMIN')
  async me(@Ctx() ctx: MyContext): Promise<UserOutput> {
    const authorization = ctx.req.get('Authorization') as string;
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      id: string;
    };
    const user = await User.findOne(payload.id);

    return user!;
  }
}
