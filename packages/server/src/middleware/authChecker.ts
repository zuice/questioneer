import { AuthChecker } from 'type-graphql';
import { verify } from 'jsonwebtoken';

import { MyContext } from '../types/MyContext';
import { User } from '../entities/User';

export const authChecker: AuthChecker<MyContext> = async (
  { context },
  roles,
) => {
  const authorization = context.req.get('Authorization') as string;

  if (!authorization) {
    return false;
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      id: string;
    };
    const id = payload.id;
    const user = await User.findOne(id);

    if (user && roles.indexOf(user.role) > -1) {
      context.payload = { userId: user!.id };
    } else {
      return false;
    }

    return true;
  } catch (_) {
    return false;
  }
};
