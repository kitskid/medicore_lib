import { IBaseEventContract } from './events.interface';

type ReqType = {
    id: string;
    patientId: string;
    triggerTime: Date | string;
    message: string;
    isRecurring: boolean;
    recurrenceRule?: any;
};

export class ReminderCreatedEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'records.reminder.created';
    readonly pattern = ReminderCreatedEventContract.pattern;
    readonly data: ReqType;
}
