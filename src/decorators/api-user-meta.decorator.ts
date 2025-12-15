import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { UserRole } from '../types/user-role.enum';

/**
 * Общий Swagger-декоратор для указания заголовков,
 * через которые в HTTP-запросе передаются данные пользователя.
 *
 * В бою эти заголовки выставляет API-шлюз / Auth-сервис.
 * В Swagger используется для ручного тестирования.
 */
export const ApiUserMeta = () =>
    applyDecorators(
        ApiHeader({
            name: 'X-User-Id',
            description: 'ID аутентифицированного пользователя',
            required: true,
            example: 'b2e4a3c9-8f21-4b7a-bc5f-1234567890ab',
        }),
        ApiHeader({
            name: 'X-User-Role',
            description: 'Роль пользователя',
            required: true,
            enum: UserRole,
            example: UserRole.PATIENT,
        }),
    );
