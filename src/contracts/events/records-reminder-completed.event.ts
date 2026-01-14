import { IBaseEventContract } from './events.interface';

type ReqType = {
    id: string;
    patientId: string;
    completedAt?: Date | string;
};

export class ReminderCompletedEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'records.reminder.completed';
    readonly pattern = ReminderCompletedEventContract.pattern;
    readonly data: ReqType;
}
