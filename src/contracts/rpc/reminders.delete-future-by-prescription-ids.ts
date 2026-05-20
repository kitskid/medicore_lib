import { IBaseRpcContract } from './rpc.interface';

type ReqType = {
    prescriptionIds: string[];
};

type ResType = {
    deletedCount: number;
};

export class ReminderDeleteFutureByPrescriptionIdsRpcContract extends IBaseRpcContract<ReqType, ResType> {
    static readonly cmd = 'reminders.delete_future_by_prescription_ids';
    readonly cmd = ReminderDeleteFutureByPrescriptionIdsRpcContract.cmd;
}
