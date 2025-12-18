import test from 'node:test';
import assert from 'node:assert/strict';
import { CryptoService } from '../crypto/crypto.service';
import { LocalKeyProvider } from '../crypto/local-key-provider';

const FIELD = 'email';
const KEY_CONFIG = {
    [FIELD]: {
        keyId: 'email-key',
        keyVersion: 'v1',
        dekB64: Buffer.alloc(32, 1).toString('base64'),
    },
};

const provider = new LocalKeyProvider(KEY_CONFIG);
const cryptoService = new CryptoService(provider);

test('encrypt/decrypt roundtrip succeeds with same AAD', async () => {
    const aad = ['user-123', 'record-1'];
    const plaintext = 'secret@example.com';

    const encrypted = await cryptoService.encrypt(FIELD, plaintext, aad);
    const decrypted = await cryptoService.decrypt(FIELD, encrypted, aad);

    assert.equal(decrypted, plaintext);
});

test('decrypt fails with wrong AAD', async () => {
    const plaintext = 'data';
    const encrypted = await cryptoService.encrypt(FIELD, plaintext, ['a']);
    await assert.rejects(
        () => cryptoService.decrypt(FIELD, encrypted, ['b']),
        /Unsupported state or unable to authenticate data/,
    );
});

test('reject invalid key size', async () => {
    const badProvider = new LocalKeyProvider({
        [FIELD]: { keyId: 'bad', keyVersion: 'v1', dekB64: Buffer.alloc(16).toString('base64') },
    });
    await assert.rejects(() => badProvider.getKey(FIELD), /DEK length invalid/);
});







