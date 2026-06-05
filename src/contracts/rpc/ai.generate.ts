import { IBaseRpcContract } from './rpc.interface';

export type AiGenerateRpcReq = {
    prompt: string;
    systemPrompt?: string;
    context?: string[];
};

export type AiGenerateRpcRes = {
    model: string;
    output: string;
};

export class AiGenerateRpcContract extends IBaseRpcContract<AiGenerateRpcReq, AiGenerateRpcRes> {
    static readonly cmd = 'ai.generate';
    readonly cmd = AiGenerateRpcContract.cmd;
}
