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

    if (!user) {
      return false;
    }

    if (roles.length <= 0) {
      return true;
    }

    if (roles.indexOf(user.role) > -1) {
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
};
