import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';

import { ValidRoles } from '../../auth/interfaces/valid-roles';
import {
  createCategories,
  createProducts,
  createSubcategories,
  createUsers,
} from '../helpers';

interface SeedUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  role: any; //Role;
}

interface SeedCategory {
  title: string;
  slug: string;
  isActive: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: any; //User
  updatedBy: any; //User
  imageId: number;
}

interface SeedRoles {
  role: ValidRoles;
}

interface SeedSubcategory {
  title: string;
  slug: string;
  isActive: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: any; //User
  updatedBy: any; //User
  imageId: number;
  category: any; //Category
}

interface SeedProducts {
  title: string;
  slug: string;
  description: string;
  discount: number;
  isPublished: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: any; //User
  updatedBy: any; //User
  subcategory: any[]; //Subcategory[]
}

interface SeedData {
  users: SeedUser[];
  roles: SeedRoles[];
  categories: SeedCategory[];
  subcategories: SeedSubcategory[];
  products: SeedProducts[];
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
      role: 1,
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
      role: 1,
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
      role: 2,
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
      role: 2,
      createdAt: dayjs().format(),
      updatedAt: dayjs().format(),
    },
    {
      firstName: 'Manuel',
      lastName: 'Acosta',
      email: 'test5@test.com',
      isActive: true,
      password: bcrypt.hashSync('Contraseña', 10),
      phoneNumber: '1122334455',
      role: 3,
      createdAt: dayjs().format(),
      updatedAt: dayjs().format(),
    },
    {
      firstName: 'Gabriela',
      lastName: 'Roblero',
      email: 'test6@test.com',
      isActive: true,
      password: bcrypt.hashSync('Contraseña', 10),
      phoneNumber: '1122334455',
      role: 3,
      createdAt: dayjs().format(),
      updatedAt: dayjs().format(),
    },
    ...createUsers(),
  ],
  roles: [
    { role: ValidRoles.superAdmin },
    { role: ValidRoles.admin },
    { role: ValidRoles.moderador },
    { role: ValidRoles.user },
  ],
  categories: [
    {
      title: 'Esta es otra categoría',
      slug: 'esta-es-otra-categoria',
      createdAt: dayjs().format(),
      createdBy: 1,
      imageId: 1,
      isActive: true,
      isPublished: false,
      updatedAt: dayjs().format(),
      updatedBy: 1,
    },
    ...createCategories(),
  ],
  subcategories: [
    {
      title: 'Esta es otra subcategoría',
      slug: 'esta-es-otra-subcategoria',
      createdAt: dayjs().format(),
      createdBy: 1,
      imageId: 1,
      isActive: true,
      isPublished: false,
      updatedAt: dayjs().format(),
      updatedBy: 1,
      category: 1,
    },
    ...createSubcategories(),
  ],
  products: [
    {
      title: 'Esta es otra subcategoría',
      slug: 'esta-es-otra-subcategoria',
      createdAt: dayjs().format(),
      createdBy: 1,
      isActive: true,
      isPublished: false,
      updatedAt: dayjs().format(),
      updatedBy: 1,
      description: 'esto es una descripción',
      discount: 0,
      subcategory: [1, 2],
    },
    ,
    ...createProducts(),
  ],
};
