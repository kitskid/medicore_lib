import { IBaseRpcContract } from './rpc.interface';

type ReqType = {
    reminderId: string;
};

type ResType = {
    marked: boolean;
};

export class ReminderMarkSentAtomicRpcContract extends IBaseRpcContract<ReqType, ResType> {
    static readonly cmd = 'reminders.mark-sent-atomic';
    readonly cmd = ReminderMarkSentAtomicRpcContract.cmd;
}
