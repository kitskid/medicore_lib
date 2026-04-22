import { IBaseEventContract } from './events.interface';
import type { PushAction } from '../../types/reminder.types';

type ReqType = {
    id: string;
    patientId: string;
    triggerTime: Date | string;
    message: string;
    isRecurring: boolean;
    recurrenceRule?: any;
    actions?: PushAction[];
};

export class ReminderCreatedEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'records.reminder.created';
    readonly pattern = ReminderCreatedEventContract.pattern;
    readonly data: ReqType;
}
