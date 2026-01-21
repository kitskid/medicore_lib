import { RpcBaseClient } from './base.client';

export class RemindersRpcClient extends RpcBaseClient {
    static readonly serviceName = 'REMINDERS_RPC';
    readonly serviceName = RemindersRpcClient.serviceName;

    static readonly queue = 'reminders_queue';
    readonly queue = RemindersRpcClient.queue;
}

