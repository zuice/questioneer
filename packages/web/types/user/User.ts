export interface User {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: 'ADMIN' | 'NORMAL';
  createdAt: number;
  updatedAt: number;
}
