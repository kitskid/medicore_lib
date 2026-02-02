import { Buffer } from 'node:buffer';
import { KeyProvider, KeySpec } from './types';

type KeyEntry = {
    keyId: string;
    keyVersion: string;
    dekB64: string;
};

type KeyConfig = Record<string, KeyEntry>;

export class LocalKeyProvider implements KeyProvider {
    private readonly config: KeyConfig;

    constructor(config: KeyConfig) {
        this.config = config;
    }

    static fromEnv(): LocalKeyProvider {
        const raw = process.env.CRYPTO_KEYS_JSON;
        if (!raw) {
            const defaultKey = process.env.CRYPTO_DEFAULT_KEY_B64;
            if (!defaultKey) {
                throw new Error('CRYPTO_KEYS_JSON or CRYPTO_DEFAULT_KEY_B64 must be set');
            }
            const defaultEntry: KeyEntry = {
                keyId: 'default',
                keyVersion: process.env.CRYPTO_DEFAULT_KEY_VERSION ?? 'v1',
                dekB64: defaultKey,
            };
            return new LocalKeyProvider({ default: defaultEntry });
        }

        let parsed: unknown;
        try {
            parsed = JSON.parse(raw);
        } catch (e) {
            throw new Error('CRYPTO_KEYS_JSON is not valid JSON');
        }

        const config: KeyConfig = {};
        for (const [fieldType, entry] of Object.entries(parsed as Record<string, any>)) {
            if (!entry?.dekB64 || !entry?.keyId || !entry?.keyVersion) {
                throw new Error(`Invalid key entry for field "${fieldType}"`);
            }
            config[fieldType] = {
                keyId: String(entry.keyId),
                keyVersion: String(entry.keyVersion),
                dekB64: String(entry.dekB64),
            };
        }

        return new LocalKeyProvider(config);
    }

    private resolveEntry(fieldType: string, keyVersion?: string): KeyEntry | undefined {
        if (keyVersion) {
            // Для обратной совместимости: можно хранить несколько версий ключей в CRYPTO_KEYS_JSON
            // под ключами вида "<fieldType>@<keyVersion>" (например "default@v1").
            const byVersion =
                this.config[`${fieldType}@${keyVersion}`] ??
                this.config[`default@${keyVersion}`];
            if (byVersion) return byVersion;

            // Фоллбек: если конфиг задан ровно одним ключом (без keyring),
            // попробуем использовать текущий entry.
            const direct = this.config[fieldType] ?? this.config.default;
            return direct;
        }

        return this.config[fieldType] ?? this.config.default;
    }

    async getKey(fieldType: string, keyVersion?: string): Promise<KeySpec> {
        const entry = this.resolveEntry(fieldType, keyVersion);
        if (!entry) {
            throw new Error(`No key configured for field type "${fieldType}"`);
        }
        const dek = Buffer.from(entry.dekB64, 'base64');
        if (dek.length !== 32) {
            throw new Error(`DEK length invalid for field "${fieldType}", expected 32 bytes (AES-256)`);
        }
        return {
            keyId: entry.keyId,
            keyVersion: entry.keyVersion,
            dek,
        };
    }
}

/**
 * KeyProvider, который перечитывает env с периодическим кешем.
 * Нужен для hot-reload: когда Vault Agent обновляет файл секретов, мы обновляем process.env,
 * а этот провайдер подхватывает новый ключ без рестарта.
 */
export class DynamicEnvKeyProvider implements KeyProvider {
    private lastLoadedAt = 0;
    private cached?: LocalKeyProvider;

    constructor(private readonly cacheTtlMs = 2_000) { }

    private getProvider(): LocalKeyProvider {
        const now = Date.now();
        if (!this.cached || now - this.lastLoadedAt > this.cacheTtlMs) {
            this.cached = LocalKeyProvider.fromEnv();
            this.lastLoadedAt = now;
        }
        return this.cached;
    }

    async getKey(fieldType: string, keyVersion?: string): Promise<KeySpec> {
        return this.getProvider().getKey(fieldType, keyVersion);
    }
}







