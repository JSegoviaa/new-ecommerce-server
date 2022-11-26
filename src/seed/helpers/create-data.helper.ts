import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { createSlug } from '.';

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const createUser = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.helpers.unique(faker.internet.email),
    isActive: true,
    password: bcrypt.hashSync('Contraseña', 10),
    phoneNumber: faker.phone.number(),
    role: 4,
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
  };
};

export const createUsers = (numUsers = 126) => {
  return Array.from({ length: numUsers }, createUser);
};

const createCategory = () => {
  return {
    title: faker.commerce.productName(),
    slug: createSlug(faker.helpers.unique(faker.commerce.productName)),
    isActive: true,
    isPublished: false,
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    createdBy: randomNumber(1, 6),
    updatedBy: randomNumber(1, 6),
    imageId: 1,
  };
};

export const createCategories = (numUsers = 120) => {
  return Array.from({ length: numUsers }, createCategory);
};

const createSubcategory = () => {
  return {
    title: faker.commerce.productName(),
    slug: createSlug(faker.helpers.unique(faker.commerce.productName)),
    createdAt: dayjs().format(),
    createdBy: randomNumber(1, 6),
    imageId: 1,
    isActive: true,
    isPublished: false,
    updatedAt: dayjs().format(),
    updatedBy: randomNumber(1, 6),
    category: randomNumber(1, 120),
  };
};

export const createSubcategories = (numUsers = 239) => {
  return Array.from({ length: numUsers }, createSubcategory);
};
