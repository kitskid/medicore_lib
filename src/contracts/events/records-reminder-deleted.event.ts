import { IBaseEventContract } from './events.interface';

type ReqType = {
    id: string;
    patientId: string;
    deletedAt?: Date | string;
};

export class ReminderDeletedEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'records.reminder.deleted';
    readonly pattern = ReminderDeletedEventContract.pattern;
    readonly data: ReqType;
}
