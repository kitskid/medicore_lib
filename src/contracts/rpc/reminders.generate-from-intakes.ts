import { IBaseRpcContract } from './rpc.interface';
import type {
    NotificationSettings,
    ReminderOptions,
    PushAction,
} from '../../types/reminder.types';

/** Запрос на создание напоминаний о приёмах лекарств по сгенерированным интейкам (расписание приёма по курсу назначения). */
type ReqType = {
    prescriptionId: string;
    /** IANA timezone пациента */
    timezone?: string;
    /** Действия для push-уведомления (формируются доменным сервисом) */
    actions?: PushAction[];
    intakes: Array<{
        id: string;
        scheduledTime: string;
        prescription: {
            patientId: string;
            medication: { tradeName: string };
            dosage: string;
            notificationWindowFrom?: string | null;
            notificationWindowTo?: string | null;
        };
    }>;
    notificationSettings?: NotificationSettings;
    reminderOptions?: ReminderOptions;
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
