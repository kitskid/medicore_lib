/**
 * Хелперы для единообразного reloadable Prisma во всех микросервисах.
 * В lib не генерируем PrismaClient — каждый сервис генерирует свой клиент из своей схемы.
 * Здесь только: резолв URL из env/config и безопасный лог без паролей.
 */

export const POSTGRES_URL_KEYS = ['POSTGRES_URL', 'DATABASE_URL'] as const;
export const POSTGRES_READ_URL_KEYS = ['POSTGRES_READ_URL'] as const;

/**
 * Берёт URL записи из process.env и опционально из config (Nest ConfigService.get).
 */
export function resolveWriteUrl(
    env: NodeJS.ProcessEnv = process.env,
    configGet?: (key: string) => string | undefined,
): string | undefined {
    for (const key of POSTGRES_URL_KEYS) {
        const v = env[key] ?? configGet?.(key);
        if (v && typeof v === 'string') return v;
    }
    return undefined;
}

/**
 * Берёт URL чтения (read replica), если задан.
 */
export function resolveReadUrl(
    env: NodeJS.ProcessEnv = process.env,
    configGet?: (key: string) => string | undefined,
): string | undefined {
    for (const key of POSTGRES_READ_URL_KEYS) {
        const v = env[key] ?? configGet?.(key);
        if (v && typeof v === 'string') return v;
    }
    return undefined;
}

/**
 * Лейбл для логов без утечки пароля (маскирует пароль в DSN).
 */
export function safeUrlLabel(url: string): string {
    try {
        const u = new URL(url);
        const schema = u.searchParams.get('schema');
        const auth = u.username ? `${u.username}:***@` : '';
        const db = u.pathname?.replace(/^\//, '') || '';
        return `${u.protocol}//${auth}${u.host}/${db}${schema ? `?schema=${schema}` : ''}`;
    } catch {
        return '<invalid-url>';
    }
}
