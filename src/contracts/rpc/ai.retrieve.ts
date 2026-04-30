import { IBaseRpcContract } from './rpc.interface';

export type AiRetrieveRpcReq = {
    query: string;
    topK?: number;
    sourceType?: string;
    sourceId?: string;
};

export type AiRetrievedChunk = {
    chunkId: string;
    documentId: string;
    content: string;
    score: number;
    metadata?: unknown;
};

export type AiRetrieveRpcRes = {
    model: string;
    chunks: AiRetrievedChunk[];
};

export class AiRetrieveRpcContract extends IBaseRpcContract<AiRetrieveRpcReq, AiRetrieveRpcRes> {
    static readonly cmd = 'ai.retrieve';
    readonly cmd = AiRetrieveRpcContract.cmd;
}
