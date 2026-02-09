import { IBaseRpcContract } from './rpc.interface';

type ReqType = {
    planId: string;
    featureKey: string;
};

type ResType = {
    enabled: boolean;
};

export class SubscriptionIsFeatureEnabledRpcContract extends IBaseRpcContract<ReqType, ResType> {
    static readonly cmd = 'subscription.is-feature-enabled';
    readonly cmd = SubscriptionIsFeatureEnabledRpcContract.cmd;
}
