import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserRole } from '../types/user-role.enum';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext): Medicore.User => {
    const request = ctx.switchToHttp().getRequest<Request>();

    // Получить заголовки (case-insensitive)
    const headers = request.headers;
    const userIdHeader = headers['x-user-id'] || headers['X-User-Id'];
    const userRoleHeader = headers['x-user-role'] || headers['X-User-Role'];
    const sessionIdHeader = headers['x-session-id'] || headers['X-Session-Id'];

    if (!userIdHeader || !userRoleHeader) {
        throw new UnauthorizedException('User ID or role not found in request headers');
    }

    // Заголовки могут быть строкой или массивом строк
    const userId = Array.isArray(userIdHeader) ? userIdHeader[0] : userIdHeader;
    const userRoleStr = Array.isArray(userRoleHeader) ? userRoleHeader[0] : userRoleHeader;
    const sessionId = sessionIdHeader
        ? Array.isArray(sessionIdHeader)
            ? sessionIdHeader[0]
            : sessionIdHeader
        : undefined;

    if (!userId || !userRoleStr) {
        throw new UnauthorizedException('User not found in request headers');
    }

    // Валидация роли
    const role = userRoleStr.toUpperCase() as UserRole;
    if (!Object.values(UserRole).includes(role)) {
        throw new UnauthorizedException(`Invalid user role: ${userRoleStr}`);
    }

    const user: Medicore.User = {
        id: String(userId),
        role: role as UserRole,
        ...(sessionId && { sessionId: String(sessionId) }),
    };

    return user;
});
