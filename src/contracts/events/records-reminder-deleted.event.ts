import { IBaseEventContract } from './events.interface';
import type { PushAction } from '../../types/reminder.types';

type ReqType = {
    id: string;
    patientId: string;
    deletedAt?: Date | string;
    actions?: PushAction[];
};

export class ReminderDeletedEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'records.reminder.deleted';
    readonly pattern = ReminderDeletedEventContract.pattern;
    readonly data: ReqType;
}
