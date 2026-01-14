import { IBaseEventContract } from './events.interface';

type ReqType = {
    id: string;
    patientId: string;
    triggerTime?: Date | string;
    message?: string;
    isRecurring?: boolean;
    recurrenceRule?: any;
    isCompleted?: boolean;
};

export class ReminderUpdatedEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'records.reminder.updated';
    readonly pattern = ReminderUpdatedEventContract.pattern;
    readonly data: ReqType;
}
