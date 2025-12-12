import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserRole } from '../types/user-role.enum';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Medicore.User => {
    const request = ctx.switchToHttp().getRequest<Request>();
    
    // Получить заголовки (case-insensitive)
    const headers = request.headers;
    const userId = headers['x-user-id'] || headers['X-User-Id'];
    const userRole = headers['x-user-role'] || headers['X-User-Role'];

    if (!userId || !userRole) {
      throw new UnauthorizedException('User not found in request headers');
    }

    // Валидация роли
    const role = userRole.toUpperCase() as UserRole;
    if (!Object.values(UserRole).includes(role)) {
      throw new UnauthorizedException(`Invalid user role: ${userRole}`);
    }

    const user: Medicore.User = {
      id: String(userId),
      role: role as UserRole,
    };

    return user;
  },
);

