import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { createSlug } from '.';

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomBool = () => (Math.random() > 0.5 ? true : false);

const createUser = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.helpers.unique(faker.internet.email),
    isActive: randomBool(),
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
    isActive: randomBool(),
    isPublished: randomBool(),
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
    isActive: randomBool(),
    isPublished: randomBool(),
    updatedAt: dayjs().format(),
    updatedBy: randomNumber(1, 6),
    category: randomNumber(1, 120),
  };
};

export const createSubcategories = (numUsers = 239) => {
  return Array.from({ length: numUsers }, createSubcategory);
};

const createProduct = () => {
  return {
    title: faker.commerce.productName(),
    slug: createSlug(faker.helpers.unique(faker.commerce.productName)),
    description: faker.lorem.words(),
    discount: randomNumber(0, 20),
    isPublished: randomBool(),
    isActive: randomBool(),
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    createdBy: randomNumber(1, 6),
    updatedBy: randomNumber(1, 6),
    subcategory: Array.from({ length: randomNumber(1, 4) }, () =>
      randomNumber(1, 239),
    ),
  };
};

export const createProducts = (numUsers = 342) => {
  return Array.from({ length: numUsers }, createProduct);
};
