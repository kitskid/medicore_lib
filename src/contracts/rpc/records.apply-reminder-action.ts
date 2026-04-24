import { IBaseRpcContract } from './rpc.interface';

type ReqType = {
    reminderId: string;
    action: string;
    recordType?: string | null;
    recordId?: string | null;
    prescriptionId?: string | null;
    intakeId?: string | null;
    patientId?: string | null;
};

type ResType = {
    success: boolean;
    handled: boolean;
    entityType?: 'intake' | 'procedure' | 'vaccination_dose';
    entityId?: string;
    reason?: string;
};

export class RecordsApplyReminderActionRpcContract extends IBaseRpcContract<ReqType, ResType> {
    static readonly cmd = 'records.apply-reminder-action';
    readonly cmd = RecordsApplyReminderActionRpcContract.cmd;
}
