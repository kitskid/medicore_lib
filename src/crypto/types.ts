export interface EncryptedPayload {
    ciphertext: string;
    iv: string;
    tag: string;
    keyVersion: string;
}

export interface KeySpec {
    keyId: string;
    keyVersion: string;
    dek: Buffer;
}

export interface KeyProvider {
    /**
     * Если keyVersion задан — используется для decrypt (чтобы читать старые данные после ротации).
     * Если не задан — используется активный ключ (для encrypt).
     */
    getKey(fieldType: string, keyVersion?: string): Promise<KeySpec>;
}

export type AadPart = string | Buffer | Uint8Array;







