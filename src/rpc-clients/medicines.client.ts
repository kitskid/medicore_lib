import { RpcBaseClient } from './base.client';

export class MedicinesRpcClient extends RpcBaseClient {
    static readonly serviceName = 'MEDICINES_RPC';
    readonly serviceName = MedicinesRpcClient.serviceName;

    static readonly queue = 'medicines_queue';
    readonly queue = MedicinesRpcClient.queue;
}
