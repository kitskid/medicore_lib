import { IBaseRpcContract } from './rpc.interface';

export type AiEmbedRpcReq = {
    inputs: string[];
};

export type AiEmbedRpcRes = {
    model: string;
    vectors: number[][];
};

export class AiEmbedRpcContract extends IBaseRpcContract<AiEmbedRpcReq, AiEmbedRpcRes> {
    static readonly cmd = 'ai.embed';
    readonly cmd = AiEmbedRpcContract.cmd;
}
