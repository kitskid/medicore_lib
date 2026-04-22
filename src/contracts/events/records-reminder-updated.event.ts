import { IBaseEventContract } from './events.interface';
import type { PushAction } from '../../types/reminder.types';

type ReqType = {
    id: string;
    patientId: string;
    triggerTime?: Date | string;
    message?: string;
    isRecurring?: boolean;
    recurrenceRule?: any;
    isCompleted?: boolean;
    actions?: PushAction[];
};

export class ReminderUpdatedEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'records.reminder.updated';
    readonly pattern = ReminderUpdatedEventContract.pattern;
    readonly data: ReqType;
}
