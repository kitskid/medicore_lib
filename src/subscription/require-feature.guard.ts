import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Inject,
    Injectable,
    Optional,
} from '@nestjs/common';
import { Request } from 'express';
import { FEATURE_KEY_METADATA } from './require-feature.decorator';
import { ISubscriptionService, SUBSCRIPTION_SERVICE } from './subscription.interface';

/**
 * Guard проверки доступа по фиче подписки.
 * Читает X-Plan-Id из заголовков и ключ фичи из декоратора @RequireFeature.
 * Если SUBSCRIPTION_SERVICE не зарегистрирован — при наличии X-Plan-Id доступ разрешается (обратная совместимость).
 * При отсутствии X-Plan-Id доступ запрещается (нет плана = нет доступа к фиче).
 */
@Injectable()
export class RequireFeatureGuard implements CanActivate {
    constructor(
        @Optional()
        @Inject(SUBSCRIPTION_SERVICE)
        private readonly subscriptionService: ISubscriptionService | null,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const featureKey = Reflect.getMetadata(
            FEATURE_KEY_METADATA,
            context.getHandler(),
        ) as string | undefined;
        if (!featureKey) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Request>();
        const planIdHeader =
            request.headers['x-plan-id'] ?? request.headers['X-Plan-Id'];
        const planId = planIdHeader
            ? (Array.isArray(planIdHeader) ? planIdHeader[0] : planIdHeader)
            : undefined;

        if (!planId) {
            throw new ForbiddenException(
                'Feature not available: no subscription plan in request',
            );
        }

        if (!this.subscriptionService) {
            return true;
        }

        const allowed = await this.subscriptionService.isFeatureEnabled(
            planId,
            featureKey,
        );
        if (!allowed) {
            throw new ForbiddenException(
                'Feature not available for your plan',
            );
        }
        return true;
    }
}
