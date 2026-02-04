import { readFile, stat } from 'node:fs/promises';

type EnvMap = Record<string, string>;

function parseEnv(content: string): EnvMap {
    const out: EnvMap = {};
    for (const rawLine of content.split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line || line.startsWith('#')) continue;
        const idx = line.indexOf('=');
        if (idx <= 0) continue;
        const key = line.slice(0, idx).trim();
        const value = line.slice(idx + 1).trim();
        if (!key) continue;
        out[key] = value;
    }
    return out;
}

async function readEnvFile(filePath: string): Promise<{ env: EnvMap; mtimeMs: number } | null> {
    try {
        const [content, st] = await Promise.all([readFile(filePath, 'utf8'), stat(filePath)]);
        return { env: parseEnv(content), mtimeMs: st.mtimeMs };
    } catch {
        return null;
    }
}

/**
 * Загружает .env-подобный файл (KEY=VALUE) в process.env.
 * Используется для подхвата секретов, отрендеренных Vault Agent.
 */
export async function loadSecretsEnvFileToProcessEnv(filePath: string): Promise<void> {
    const res = await readEnvFile(filePath);
    if (!res) return;
    for (const [k, v] of Object.entries(res.env)) {
        process.env[k] = v;
    }
}

/**
 * Периодически проверяет файл на изменение и при изменении обновляет process.env
 * и вызывает onReload(changedKeys). skipInitial: true — не вызывать onReload при первом чтении.
 */
export function startSecretsEnvFilePoller(
    filePath: string,
    {
        intervalMs = 2_000,
        onReload,
        skipInitial = true,
    }: { intervalMs?: number; onReload?: (changedKeys: string[]) => void; skipInitial?: boolean } = {},
): { stop: () => void } {
    let lastMtimeMs = 0;
    let lastSnapshot: EnvMap = {};
    let stopped = false;

    const init = async () => {
        if (!skipInitial) return;
        const res = await readEnvFile(filePath);
        if (!res) return;
        lastMtimeMs = res.mtimeMs;
        lastSnapshot = res.env;
        for (const [k, v] of Object.entries(res.env)) {
            process.env[k] = v;
        }
    };

    const tick = async () => {
        if (stopped) return;
        const res = await readEnvFile(filePath);
        if (!res) return;
        if (res.mtimeMs === lastMtimeMs) return;
        lastMtimeMs = res.mtimeMs;

        const changedKeys: string[] = [];
        for (const [k, v] of Object.entries(res.env)) {
            if (lastSnapshot[k] !== v) changedKeys.push(k);
            process.env[k] = v;
        }
        lastSnapshot = res.env;

        if (changedKeys.length) onReload?.(changedKeys);
    };

    void init().then(() => void tick());
    const timer = setInterval(() => void tick(), intervalMs);
    return {
        stop: () => {
            stopped = true;
            clearInterval(timer);
        },
    };
}
