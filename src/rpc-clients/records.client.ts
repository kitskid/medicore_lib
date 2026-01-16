import { RpcBaseClient } from './base.client';

export class RecordsRpcClient extends RpcBaseClient {
    static readonly serviceName = 'RECORDS_RPC';
    readonly serviceName = RecordsRpcClient.serviceName;

    static readonly queue = 'records_queue';
    readonly queue = RecordsRpcClient.queue;
}
