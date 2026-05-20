/**
 * Токен для инъекции сервиса подписок в микросервисах.
 * Если не зарегистрирован — RequireFeatureGuard при наличии X-Plan-Id разрешает доступ (обратная совместимость).
 */
export const SUBSCRIPTION_SERVICE = Symbol('SUBSCRIPTION_SERVICE');

/**
 * Сервис проверки возможностей плана. Реализуется в medicore_auth, микросервисы подключают через RPC/HTTP-клиент.
 */
export interface ISubscriptionService {
    isFeatureEnabled(planId: string, featureKey: string): Promise<boolean>;
    getStorageLimitBytes?(planId: string): Promise<number>;
}
