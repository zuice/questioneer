import { AuthChecker } from 'type-graphql';
import { verify } from 'jsonwebtoken';

import { MyContext } from '../types/MyContext';
import { User } from '../entities/User';

export const authChecker: AuthChecker<MyContext> = async (
  { context },
  roles,
) => {
  const authorization = context.req.headers['authorization'] as string;

  if (!authorization) {
    return false;
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    const user = await User.findOne((payload as any).userId as string);

    context.payload = payload as any;

    if (
      (user && roles.length <= 0) ||
      (user && roles.indexOf(user.role) > -1)
    ) {
      context.payload = { userId: user!.id };
    } else {
      return false;
    }

    return true;
  } catch (_) {
    return false;
  }
};
