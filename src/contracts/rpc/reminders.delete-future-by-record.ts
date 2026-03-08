import { IBaseRpcContract } from './rpc.interface';
import type { ReminderRecordType } from '../../types/reminder.types';

type ReqType = {
    recordType: ReminderRecordType;
    recordIds: string[];
};

type ResType = {
    deletedCount: number;
};

export class ReminderDeleteFutureByRecordRpcContract extends IBaseRpcContract<ReqType, ResType> {
    static readonly cmd = 'reminders.delete_future_by_record';
    readonly cmd = ReminderDeleteFutureByRecordRpcContract.cmd;
}
