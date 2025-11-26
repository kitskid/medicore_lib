// Re-export event contracts
export * from './contracts/events/auth-user-registered.event';
export * from './contracts/events/appointment-created.event';
export * from './contracts/events/appointment-updated.event';
export * from './contracts/events/appointment-canceled.event';
export * from './contracts/events/profile-created.event';
export * from './contracts/events/profile-updated.event';
export * from './contracts/events/profile-deleted.event';

// Re-export rpc contracts
export * from './contracts/rpc/get-personal-profile';

// // Re-export rmq-client
export * from './rmq-client/rmq.client';

// // Re-export rpc-clients
export * from './rpc-clients/auth.client';
export * from './rpc-clients/profiles.client';

// // Re-export common types & interfaces
// export * from './types/event.interface';
// export * from './types/user.types';
// export * from './types/order.types';

// // Re-export enums
// export * from './enums/order-status.enum';
// export * from './enums/user-role.enum';
