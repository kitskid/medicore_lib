import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RpcBaseClient } from './base.client';

@Injectable()
export class AiRpcClient extends RpcBaseClient {
    static readonly serviceName = 'AI';
    static readonly queue = 'medicore.ai.rpc';
    readonly serviceName = AiRpcClient.serviceName;
    readonly queue = AiRpcClient.queue;

    constructor(client: ClientProxy) {
        super(client);
    }
}
