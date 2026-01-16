// Re-export event contracts
export * from './contracts/events/auth-user-registered.event';
export * from './contracts/events/auth-email-code-sent.event';
export * from './contracts/events/auth-phone-code-sent.event';
export * from './contracts/events/auth-login-phone-code-sent.event';
export * from './contracts/events/auth-pin-reset-code-sent.event';
export * from './contracts/events/calendar-appointment-created.event';
export * from './contracts/events/calendar-appointment-updated.event';
export * from './contracts/events/calendar-appointment-canceled.event';
export * from './contracts/events/records-reminder-created.event';
export * from './contracts/events/records-reminder-updated.event';
export * from './contracts/events/records-reminder-completed.event';
export * from './contracts/events/records-reminder-deleted.event';
export * from './contracts/events/profiles-profile-created.event';
export * from './contracts/events/profiles-profile-updated.event';
export * from './contracts/events/profiles-profile-deleted.event';
export * from './contracts/events/auth-forgot-password-email-code-sent.event';
export * from './contracts/events/auth-forgot-password-phone-code-sent.event';

// Re-export rpc contracts
export * from './contracts/rpc/get-personal-profile';
export * from './contracts/rpc/profile.create';
export * from './contracts/rpc/patient.create';

// // Re-export rmq-client
export * from './rmq-client/rmq.client';

// // Re-export rpc-clients
export * from './rpc-clients/auth.client';
export * from './rpc-clients/profiles.client';
export * from './rpc-clients/records.client';

// Crypto utilities
export * from './crypto';

// Re-export common types & interfaces
export * from './types/user.types';
export * from './types/user-role.enum';

// Re-export decorators
export * from './decorators/user.decorator';
export * from './decorators/api-user-meta.decorator';
