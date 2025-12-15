import { RpcBaseClient } from './base.client';

export class ProfilesRpcClient extends RpcBaseClient {
    static readonly serviceName = 'PROFILES_RPC';
    readonly serviceName = ProfilesRpcClient.serviceName;

    static readonly queue = 'profiles_queue';
    readonly queue = ProfilesRpcClient.queue;
}
