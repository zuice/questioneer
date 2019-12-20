import { User } from './User';

export interface AuthenticateUserOutput {
  authenticateUser: {
    user: User;
    accessToken: string;
  };
}
