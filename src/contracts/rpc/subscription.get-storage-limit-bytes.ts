import { IBaseRpcContract } from './rpc.interface';

type ReqType = {
    planId: string;
};

type ResType = {
    storageLimitBytes: number;
};

export class SubscriptionGetStorageLimitBytesRpcContract extends IBaseRpcContract<ReqType, ResType> {
    static readonly cmd = 'subscription.get-storage-limit-bytes';
    readonly cmd = SubscriptionGetStorageLimitBytesRpcContract.cmd;
}
