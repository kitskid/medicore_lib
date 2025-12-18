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
    getKey(fieldType: string): Promise<KeySpec>;
}

export type AadPart = string | Buffer | Uint8Array;







