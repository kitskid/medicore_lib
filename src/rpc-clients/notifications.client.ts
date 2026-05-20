import { RpcBaseClient } from './base.client';

export class NotificationsRpcClient extends RpcBaseClient {
    static readonly serviceName = 'NOTIFICATIONS_RPC';
    readonly serviceName = NotificationsRpcClient.serviceName;

    static readonly queue = 'notifications_queue';
    readonly queue = NotificationsRpcClient.queue;
}
