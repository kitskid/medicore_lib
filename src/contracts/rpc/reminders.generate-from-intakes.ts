import { IBaseRpcContract } from './rpc.interface';

type ReqType = {
    prescriptionId: string;
    intakes: Array<{
        id: string;
        scheduledTime: string; // ISO 8601
        prescription: {
            patientId: string;
            medication: { tradeName: string };
            dosage: string;
        };
    }>;
    notificationSettings?: {
        repeatCount?: number;
        repeatInterval?: number;
    };
};

type ResType = {
    success: boolean;
    reminderIds: string[];
    count: number;
};

export class ReminderGenerateFromIntakesRpcContract extends IBaseRpcContract<ReqType, ResType> {
    static readonly cmd = 'reminders.generate.from_intakes';
    readonly cmd = ReminderGenerateFromIntakesRpcContract.cmd;
}
