import * as fs from "node:fs";
import * as path from "node:path";

/**
 * Загружает env-файл (KEY=value по строкам) в process.env.
 * Не перезаписывает уже существующие ключи в process.env.
 */
export async function loadSecretsEnvFileToProcessEnv(filePath: string): Promise<void> {
  try {
    const content = await fs.promises.readFile(filePath, "utf-8");
    const lines = content.split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq <= 0) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  } catch (err: any) {
    if (err?.code !== "ENOENT") {
      console.warn(`[secrets-env] Failed to load ${filePath}:`, err?.message ?? err);
    }
  }
}

export type SecretsEnvFilePollerOptions = {
  intervalMs: number;
  skipInitial?: boolean;
  onReload: (changedKeys: string[]) => void;
};

let pollerTimer: ReturnType<typeof setInterval> | null = null;

/**
 * Периодически проверяет mtime файла и при изменении перечитывает его,
 * сравнивает ключи и вызывает onReload с списком изменённых ключей.
 */
export function startSecretsEnvFilePoller(
  filePath: string,
  options: SecretsEnvFilePollerOptions,
): void {
  const { intervalMs, skipInitial = false, onReload } = options;
  let lastMtime = 0;
  let lastKeys: Set<string> = new Set();

  const tick = async () => {
    try {
      const stat = await fs.promises.stat(filePath);
      const mtime = stat.mtimeMs;
      if (mtime === lastMtime) return;
      lastMtime = mtime;
      const content = await fs.promises.readFile(filePath, "utf-8");
      const keys = new Set<string>();
      const lines = content.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eq = trimmed.indexOf("=");
        if (eq <= 0) continue;
        const key = trimmed.slice(0, eq).trim();
        if (key) keys.add(key);
      }
      const changed: string[] = [];
      for (const k of keys) {
        if (!lastKeys.has(k)) changed.push(k);
      }
      for (const k of lastKeys) {
        if (!keys.has(k)) changed.push(k);
      }
      lastKeys = keys;
      if (changed.length) onReload(changed);
    } catch {
      // ignore
    }
  };

  if (!skipInitial) {
    void tick();
  }
  if (pollerTimer) clearInterval(pollerTimer);
  pollerTimer = setInterval(tick, intervalMs);
}
