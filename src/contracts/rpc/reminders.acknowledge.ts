import { IBaseRpcContract } from './rpc.interface';

type ReqType = {
    reminderId: string;
    action: string;
    userId: string;
};

type ResType = {
    success: boolean;
};

export class ReminderAcknowledgeRpcContract extends IBaseRpcContract<ReqType, ResType> {
    static readonly cmd = 'reminders.acknowledge';
    readonly cmd = ReminderAcknowledgeRpcContract.cmd;
}
