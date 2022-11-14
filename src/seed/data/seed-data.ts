import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { ValidRoles } from '../../auth/interfaces/valid-roles';

interface SeedUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  roleId: number;
}

interface SeedRoles {
  role: ValidRoles;
}

interface SeedData {
  users: SeedUser[];
  roles: SeedRoles[];
}

export const initialData: SeedData = {
  users: [
    {
      firstName: 'José Manuel',
      lastName: 'Acosta Segovia',
      email: 'test@test.com',
      isActive: true,
      password: bcrypt.hashSync('Contraseña', 10),
      phoneNumber: '1122334455',
      roleId: 1,
      createdAt: dayjs().format(),
      updatedAt: dayjs().format(),
    },
    {
      firstName: 'Karla Gabriela',
      lastName: 'Roblero Cano',
      email: 'test2@test.com',
      isActive: true,
      password: bcrypt.hashSync('Contraseña', 10),
      phoneNumber: '1122334455',
      roleId: 2,
      createdAt: dayjs().format(),
      updatedAt: dayjs().format(),
    },
    {
      firstName: 'José',
      lastName: 'Acosta',
      email: 'test3@test.com',
      isActive: true,
      password: bcrypt.hashSync('Contraseña', 10),
      phoneNumber: '1122334455',
      roleId: 3,
      createdAt: dayjs().format(),
      updatedAt: dayjs().format(),
    },
    {
      firstName: 'Karla',
      lastName: 'Roblero',
      email: 'test4@test.com',
      isActive: true,
      password: bcrypt.hashSync('Contraseña', 10),
      phoneNumber: '1122334455',
      roleId: 4,
      createdAt: dayjs().format(),
      updatedAt: dayjs().format(),
    },
  ],
  roles: [
    { role: ValidRoles.superAdmin },
    { role: ValidRoles.admin },
    { role: ValidRoles.moderador },
    { role: ValidRoles.user },
  ],
};
