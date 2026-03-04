/**
 * Контракт subscription-service по новой модели: один RPC getCapabilities, проверка через caps.includes(cap).
 */
export interface ISubscriptionService {
    getCapabilities(userId: string): Promise<string[]>;
}

/**
 * Ответ GET /api/subscription для фронта (plan, status, expiresAt, capabilities).
 */
export interface ISubscriptionApiResponse {
    plan: string;
    status: 'active' | 'canceled' | 'expired';
    expiresAt: string;
    capabilities: string[];
}
