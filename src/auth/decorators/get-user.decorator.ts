import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ValidRoles } from '../interfaces';
import { User } from '../../users/entities';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    const user = req.user;

    if (!user) {
      throw new InternalServerErrorException('User not found in request');
    }

    return !data ? user : user[data];
  },
);

export const GetUserGql = createParamDecorator(
  (roles: ValidRoles[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    const user: User = ctx.getContext().req.user;

    if (!user) {
      throw new InternalServerErrorException('User not found in request');
    }

    if (roles.length === 0) return user;

    if (roles.includes(user.role.role as ValidRoles)) {
      return user;
    }

    throw new ForbiddenException(`User ${user.firstName} needs a valid role`);
  },
);
