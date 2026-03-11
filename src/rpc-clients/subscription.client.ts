import { RpcBaseClient } from './base.client';

export class SubscriptionRpcClient extends RpcBaseClient {
    static readonly serviceName = 'SUBSCRIPTION_RPC';
    readonly serviceName = SubscriptionRpcClient.serviceName;

    static readonly queue = 'subscriptions_queue';
    readonly queue = SubscriptionRpcClient.queue;
}
