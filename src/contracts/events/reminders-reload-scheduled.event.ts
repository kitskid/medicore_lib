import { IBaseEventContract } from './events.interface';

type ReqType = {
    patientId?: string; // Опционально - если для конкретного пользователя
    lastScheduledTriggerTime: Date | string; // Когда сработало последнее запланированное напоминание
    timestamp: Date | string;
};

export class RemindersReloadScheduledEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'reminders.reload.scheduled';
    readonly pattern = RemindersReloadScheduledEventContract.pattern;
    readonly data: ReqType;
}
