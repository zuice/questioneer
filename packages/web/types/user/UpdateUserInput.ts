export interface UpdateUserInput {
  input: {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: 'NORMAL' | 'ADMIN';
  };
}
