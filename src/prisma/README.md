# Reloadable Prisma (Vault hot-reload)

В lib **не генерируется** PrismaClient — у Prisma нет класса «из коробки», клиент генерируется только из схемы каждого сервиса. Здесь только общие хелперы.

## Что экспортирует lib

- **resolveWriteUrl(env, configGet)** — URL записи из `POSTGRES_URL` / `DATABASE_URL`.
- **resolveReadUrl(env, configGet)** — URL чтения (read replica) из `POSTGRES_READ_URL`, опционально.
- **safeUrlLabel(url)** — лейбл для логов без пароля (маска `user:***@host/db`).

## Как сделать единообразный PrismaService в микросервисе

1. **Клиент** по-прежнему генерируете в сервисе: `prisma generate` → `prisma-generated/`.
2. **PrismaService** в сервисе:
    - наследует **свой** сгенерированный `PrismaClient`;
    - в конструкторе вызывает `resolveWriteUrl(process.env, configService.get)` и при необходимости `resolveReadUrl`;
    - создаёт один (или два при read replica) экземпляр клиента и оборачивает себя в **Proxy**: все обращения к моделям идут в `activeClient`, а методы `reloadFromEnv`, `getCurrentUrl`, `onModuleInit`, `onModuleDestroy` — в сам сервис;
    - при смене URL (Vault/файл секретов) вызывает `reloadFromEnv()`: создаёт новый клиент, `$connect`, подменяет `activeClient`, отключает старый; при ошибке подключения оставляет старый клиент.
3. Логирование смены URL делайте через **safeUrlLabel(url)** из lib.

Эталон реализации:

- **Один URL (только запись):** `medicore_files/src/prisma/prisma.service.ts`
- **Запись + read replica:** `medicore_auth/src/database/prisma.service.ts`

Дальше в `main.ts` при hot-reload секретов вызывайте `app.get(PrismaService).reloadFromEnv()` при изменении ключей `POSTGRES_URL` / `DATABASE_URL` (и при необходимости `POSTGRES_READ_URL`).
