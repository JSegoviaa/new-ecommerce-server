import { Role } from '../../roles/entities';

export interface AuthResponse {
  token: string;
  user: User;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  id: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  role: Role;
}

export interface BlockTokens {
  token: string;
  id: number;
}
