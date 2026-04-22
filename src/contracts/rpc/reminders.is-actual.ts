import { IBaseRpcContract } from './rpc.interface';

type ReqType = {
    reminderId: string;
    allowAlreadySent?: boolean;
};

type ResType = {
    isActual: boolean;
};

export class ReminderIsActualRpcContract extends IBaseRpcContract<ReqType, ResType> {
    static readonly cmd = 'reminders.is-actual';
    readonly cmd = ReminderIsActualRpcContract.cmd;
}
