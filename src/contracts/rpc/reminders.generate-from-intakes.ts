import { IBaseRpcContract } from './rpc.interface';

type ReqType = {
    prescriptionId: string;
    intakes: Array<{
        id: string;
        scheduledTime: string; // ISO 8601
        prescription: {
            patientId: string;
            medication: { tradeName: string };
            dosage: string;
            // Окно отправки/повторов (HH:mm). Если не задано — отправляем всегда.
            notificationWindowFrom?: string | null;
            notificationWindowTo?: string | null;
        };
    }>;
    notificationSettings?: {
        // null = без ограничений (повторы по repeatInterval до отмены/выполнения)
        repeatCount?: number | null;
        repeatInterval?: number;
    };
    reminderOptions?: {
        // Флаги напоминаний ДО события / курса
        before5min?: boolean;
        before15min?: boolean;
        before30hour?: boolean;
        before1hour?: boolean;
        before1day?: boolean;
        customInterval?: { value: number; unit: 'seconds' | 'minutes' | 'hours' };
        fixedTime5min?: boolean;
        fixedTime15min?: boolean;
        fixedTime30hour?: boolean;
        fixedTime1hour?: boolean;
        fixedTime1day?: boolean;
        customFixedTime?: string;
    };
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
