import { RpcBaseClient } from './base.client';

export class AuthRpcClient extends RpcBaseClient {
    static readonly serviceName = 'AUTH_RPC';
    readonly serviceName = AuthRpcClient.serviceName;

    static readonly queue = 'auth_queue';
    readonly queue = AuthRpcClient.queue;
}
