import { IBaseRpcContract } from './rpc.interface';

type ReqType = string; // userId
type ResType = string[]; // capabilities

export class SubscriptionGetCapabilitiesRpcContract extends IBaseRpcContract<ReqType, ResType> {
    static readonly cmd = 'subscription.getCapabilities';
    readonly cmd = SubscriptionGetCapabilitiesRpcContract.cmd;
}
