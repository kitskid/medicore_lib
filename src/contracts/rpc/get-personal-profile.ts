import { IBaseRpcContract } from './rpc.interface';

type ReqType = {
    a: number;
    b: number;
};

type ResType = number;

export class AddNumbersRpcContract implements IBaseRpcContract<ReqType, ResType> {
    static readonly cmd = 'numbers.add';
    readonly cmd = AddNumbersRpcContract.cmd;
    readonly data: ReqType;
    readonly response: ResType;
}
