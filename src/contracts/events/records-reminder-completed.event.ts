import { IBaseEventContract } from './events.interface';
import type { PushAction } from '../../types/reminder.types';

type ReqType = {
    id: string;
    patientId: string;
    completedAt?: Date | string;
    actions?: PushAction[];
};

export class ReminderCompletedEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'records.reminder.completed';
    readonly pattern = ReminderCompletedEventContract.pattern;
    readonly data: ReqType;
}
