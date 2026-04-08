export type UserRole = 'Admin' | 'Customer';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Inactive';
}