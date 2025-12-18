import { randomBytes, createCipheriv, createDecipheriv } from 'node:crypto';
import { AadPart, EncryptedPayload, KeyProvider } from './types';

export class CryptoService {
    constructor(private readonly keyProvider: KeyProvider) {}

    async encrypt(fieldType: string, plaintext: string, aadParts: AadPart[]): Promise<EncryptedPayload> {
        const { dek, keyVersion } = await this.keyProvider.getKey(fieldType);
        const iv = randomBytes(12);
        const aad = buildAad(aadParts);

        const cipher = createCipheriv('aes-256-gcm', dek, iv);
        cipher.setAAD(aad);
        const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
        const tag = cipher.getAuthTag();

        return {
            ciphertext: ciphertext.toString('base64'),
            iv: iv.toString('base64'),
            tag: tag.toString('base64'),
            keyVersion,
        };
    }

    async decrypt(fieldType: string, payload: EncryptedPayload, aadParts: AadPart[]): Promise<string> {
        const { dek, keyVersion } = await this.keyProvider.getKey(fieldType);
        if (payload.keyVersion !== keyVersion) {
            // Ключ устарел, но пытаемся расшифровать текущим для обратной совместимости
        }
        const iv = Buffer.from(payload.iv, 'base64');
        const tag = Buffer.from(payload.tag, 'base64');
        const ciphertext = Buffer.from(payload.ciphertext, 'base64');
        const aad = buildAad(aadParts);

        const decipher = createDecipheriv('aes-256-gcm', dek, iv);
        decipher.setAAD(aad);
        decipher.setAuthTag(tag);

        const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
        return plaintext.toString('utf8');
    }
}

export function buildAad(parts: AadPart[]): Buffer {
    const buffers = parts.map((part) => {
        if (typeof part === 'string') return Buffer.from(part, 'utf8');
        return Buffer.from(part);
    });
    if (buffers.length === 1) return buffers[0];
    const separator = Buffer.from('|', 'utf8');
    return Buffer.concat(
        buffers.reduce<Buffer[]>((acc, buf, idx) => {
            acc.push(buf);
            if (idx < buffers.length - 1) acc.push(separator);
            return acc;
        }, []),
    );
}







