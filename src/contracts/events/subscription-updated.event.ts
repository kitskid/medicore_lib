import { IBaseEventContract } from './events.interface';

export type SubscriptionUpdatedEventPayload = {
    userId: string;
    capabilities: string[];
};

export class SubscriptionUpdatedEventContract implements IBaseEventContract<SubscriptionUpdatedEventPayload> {
    static readonly pattern = 'subscription.updated';
    readonly pattern = SubscriptionUpdatedEventContract.pattern;
    readonly data: SubscriptionUpdatedEventPayload;
}
