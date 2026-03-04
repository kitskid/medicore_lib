/**
 * Возвращает URL для записи в БД из env или getConfig.
 * Приоритет: POSTGRES_URL, DATABASE_URL.
 */
export function resolveWriteUrl(
  env: NodeJS.ProcessEnv,
  getConfig: (key: string) => string | undefined,
): string | undefined {
  return getConfig("POSTGRES_URL") ?? getConfig("DATABASE_URL")
    ?? env.POSTGRES_URL ?? env.DATABASE_URL;
}

/**
 * Возвращает URL для чтения (read replica) из env или getConfig.
 * Приоритет: POSTGRES_READ_URL, DATABASE_READ_URL.
 */
export function resolveReadUrl(
  env: NodeJS.ProcessEnv,
  getConfig: (key: string) => string | undefined,
): string | undefined {
  return getConfig("POSTGRES_READ_URL") ?? getConfig("DATABASE_READ_URL")
    ?? env.POSTGRES_READ_URL ?? env.DATABASE_READ_URL;
}

/**
 * Возвращает строку для логов: URL с замаскированным паролем.
 */
export function safeUrlLabel(url: string): string {
  if (!url) return "(empty)";
  try {
    const u = new URL(url);
    if (u.password) {
      u.password = "***";
      return u.toString();
    }
    return url;
  } catch {
    return "(invalid)";
  }
}
