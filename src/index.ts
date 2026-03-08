// Re-export event contracts
export * from './contracts/events/auth-user-registered.event';
export * from './contracts/events/auth-email-code-sent.event';
export * from './contracts/events/auth-phone-code-sent.event';
export * from './contracts/events/auth-login-phone-code-sent.event';
export * from './contracts/events/auth-pin-reset-code-sent.event';
export * from './contracts/events/auth-timezone-updated.event';
export * from './contracts/events/calendar-appointment-created.event';
export * from './contracts/events/calendar-appointment-updated.event';
export * from './contracts/events/calendar-appointment-canceled.event';
export * from './contracts/events/records-reminder-created.event';
export * from './contracts/events/records-reminder-updated.event';
export * from './contracts/events/records-reminder-completed.event';
export * from './contracts/events/records-reminder-deleted.event';
export * from './contracts/events/reminders-reload-scheduled.event';
export * from './contracts/events/profiles-profile-created.event';
export * from './contracts/events/profiles-profile-updated.event';
export * from './contracts/events/profiles-profile-deleted.event';
export * from './contracts/events/auth-forgot-password-email-code-sent.event';
export * from './contracts/events/auth-forgot-password-phone-code-sent.event';
export * from './contracts/events/subscription-updated.event';

// Re-export rpc contracts
export * from './contracts/rpc/get-personal-profile';
export * from './contracts/rpc/profile.create';
export * from './contracts/rpc/patient.create';
export * from './contracts/rpc/reminders.create-from-rule';
export * from './contracts/rpc/reminders.generate-from-intakes';
export * from './contracts/rpc/reminders.delete-future-by-prescription-ids';
export * from './contracts/rpc/reminders.delete-future-by-record';
export * from './contracts/rpc/reminders.acknowledge';
export * from './contracts/rpc/subscription.get-storage-limit-bytes';
export * from './contracts/rpc/subscription.is-feature-enabled';

// // Re-export rmq-client
export * from './rmq-client/rmq.client';

// // Re-export rpc-clients
export * from './rpc-clients/auth.client';
export * from './rpc-clients/profiles.client';
export * from './rpc-clients/records.client';
export * from './rpc-clients/reminders.client';

// Crypto utilities
export * from './crypto';

// Re-export common types & interfaces (subscription types: ISubscriptionService идёт из ./subscription, здесь только ответ API)
export * from './types/user.types';
export * from './types/user-role.enum';
export type { ISubscriptionApiResponse } from './types/subscription-service.interface';
export * from './types/reminder.types';

// Re-export decorators
export * from './decorators/user.decorator';
export * from './decorators/api-user-meta.decorator';

// Subscription (guard, feature keys, ISubscriptionService)
export * from './subscription';

// Role guard
export * from './guards';

// Reloadable Prisma helpers (URL resolve + safe logging; клиент генерируется в каждом сервисе)
// См. src/prisma/README.md
export * from './prisma';

// Secrets env file (загрузка и поллер для Vault Agent–рендеренных файлов)
export * from './secrets';
