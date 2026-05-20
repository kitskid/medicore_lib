import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { ROLES_METADATA_KEY } from './require-roles.decorator';
import { UserRole } from '../types/user-role.enum';

/**
 * Guard проверки роли: доступ только если X-User-Role входит в список ролей из @RequireRoles.
 * Читает заголовок X-User-Role и метаданные с метода/класса.
 */
@Injectable()
export class RequireRolesGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const handlerRoles = Reflect.getMetadata(
            ROLES_METADATA_KEY,
            context.getHandler(),
        ) as UserRole[] | undefined;
        const classRoles = Reflect.getMetadata(
            ROLES_METADATA_KEY,
            context.getClass(),
        ) as UserRole[] | undefined;
        const allowedRoles = handlerRoles ?? classRoles;
        if (!allowedRoles?.length) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Request>();
        const roleHeader =
            request.headers['x-user-role'] ?? request.headers['X-User-Role'];
        const roleStr = roleHeader
            ? (Array.isArray(roleHeader) ? roleHeader[0] : roleHeader)
            : undefined;
        if (!roleStr) {
            throw new ForbiddenException('User role not found in request');
        }
        const role = roleStr.toUpperCase() as UserRole;
        if (!Object.values(UserRole).includes(role)) {
            throw new ForbiddenException(`Invalid user role: ${roleStr}`);
        }
        if (!allowedRoles.includes(role)) {
            throw new ForbiddenException('Insufficient permissions');
        }
        return true;
    }
}
