import { Resolver, Mutation, Ctx, Arg } from 'type-graphql';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

import { AuthenticateUserOutput } from './authenticate-user/AuthenticateUserOutput';
import { AuthenticateUserInput } from './authenticate-user/AuthenticateUserInput';
import { User } from '../../entities/User';
import {
  sendRefreshToken,
  createRefreshToken,
  createAccessToken,
} from '../../lib/auth';

@Resolver()
export class AuthenticateUserResolver {
  @Mutation(() => AuthenticateUserOutput)
  async authenticateUser(
    @Ctx() ctx: ExpressContext,
    @Arg('input') input: AuthenticateUserInput,
  ): Promise<AuthenticateUserOutput> {
    const { email } = input;
    const user = await User.findOne({ where: { email } });

    sendRefreshToken(ctx.res, createRefreshToken(user!));

    const accessToken = createAccessToken(user!);

    return { accessToken, user: user! };
  }
}
