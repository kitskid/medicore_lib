import { IBaseRpcContract } from './rpc.interface';

/** Сериализуемый ответ для переиспользования в других сервисах */
export interface EntitlementResponse {
    planId: string;
    planName: string;
    status: string;
    source: string;
    expiresAt: string | null;
    capabilities: string;
    features: string[];
    limits: { storageLimitBytes: number; maxPatients: number };
    version: number;
}

type ReqType = string; // userId
type ResType = EntitlementResponse | null;

export class SubscriptionGetEntitlementRpcContract extends IBaseRpcContract<ReqType, ResType> {
    static readonly cmd = 'subscription.get-entitlement';
    readonly cmd = SubscriptionGetEntitlementRpcContract.cmd;
}
