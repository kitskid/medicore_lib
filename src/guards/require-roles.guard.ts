import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserRole } from '../types/user-role.enum';

export const ROLES_METADATA_KEY = 'roles';

/**
 * Декоратор: задаёт список ролей, допустимых для обработчика/контроллера.
 * Используется вместе с RequireRolesGuard.
 */
export const RequireRoles = (...roles: UserRole[]) => SetMetadata(ROLES_METADATA_KEY, roles);

@Injectable()
export class RequireRolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_METADATA_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!roles?.length) return true;

        const request = context.switchToHttp().getRequest<Request>();
        const header = request.headers['x-user-role'] ?? request.headers['X-User-Role'];
        const roleStr = Array.isArray(header) ? header[0] : header;
        if (!roleStr) {
            throw new ForbiddenException('Role not found in request');
        }
        const userRole = roleStr.toUpperCase() as UserRole;
        if (!Object.values(UserRole).includes(userRole)) {
            throw new ForbiddenException(`Invalid role: ${roleStr}`);
        }
        if (!roles.includes(userRole)) {
            throw new ForbiddenException('Insufficient permissions');
        }
        return true;
    }
}
