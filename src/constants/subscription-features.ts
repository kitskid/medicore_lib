/**
 * Список capability-ключей подписок. Используется в Guard (caps.includes(cap)), в plan→capabilities mapping и при проверке прав.
 */
export const SUBSCRIPTION_FEATURE_KEYS = [
    'PROFILES_MAIN',
    'PROFILES_ADDRESSES',
    'PROFILES_EMERGENCY_CONTACTS',
    'RECORDS_PATIENTS',
    'RECORDS_EVENTS',
    'RECORDS_DOCUMENTS',
    'FILES_UPLOAD',
    'FILES_LIST_DOWNLOAD',
    'CALENDAR_VIEW',
    'NOTIFICATIONS_READ',
    'NOTIFICATIONS_PUSH',
] as const;

export type SubscriptionFeatureKey = (typeof SUBSCRIPTION_FEATURE_KEYS)[number];
