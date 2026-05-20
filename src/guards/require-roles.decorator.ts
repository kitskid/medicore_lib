import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../types/user-role.enum';

export const ROLES_METADATA_KEY = 'allowedRoles';

/**
 * Вешает на метод/контроллер список разрешённых ролей.
 * Используется вместе с RequireRolesGuard.
 */
export const RequireRoles = (...roles: UserRole[]) => SetMetadata(ROLES_METADATA_KEY, roles);
