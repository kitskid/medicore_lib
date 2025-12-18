export type FieldKeyMapping = Record<
    string,
    {
        keyId: string;
        keyVersion: string;
    }
>;

// Базовый маппинг: все поля, не указанные явно, могут использовать default.
export const defaultFieldKeyMapping: FieldKeyMapping = {
    'pii.default': { keyId: 'pii-key', keyVersion: 'v1' },
    'medical.default': { keyId: 'medical-key', keyVersion: 'v1' },
    'notification.default': { keyId: 'notification-key', keyVersion: 'v1' },
};

// Пример использования: CRYPTO_KEYS_JSON должен содержать записи вида
// {
//   "pii.default": { "keyId": "pii-key", "keyVersion": "v1", "dekB64": "..." },
//   "medical.default": { "keyId": "med-key", "keyVersion": "v1", "dekB64": "..." }
// }







