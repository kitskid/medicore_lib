import { SetMetadata } from '@nestjs/common';

export const FEATURE_KEY_METADATA = 'featureKey';

/**
 * Вешает на метод контроллера требование фичи подписки.
 * Используется вместе с RequireFeatureGuard: guard читает ключ через Reflector.
 */
export const RequireFeature = (featureKey: string) => SetMetadata(FEATURE_KEY_METADATA, featureKey);
