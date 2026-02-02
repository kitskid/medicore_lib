import { IBaseRpcContract } from './rpc.interface';

export type ReminderRuleType = 'COURSE' | 'ONE_TIME';

export type ReminderRuleDto = {
    type: ReminderRuleType;
    // Общие поля
    timezone?: string;

    // Для COURSE (курсовой приём лекарств)
    startDate?: string; // ISO 8601
    durationDays?: number;
    frequency?: string; // например, 'daily', 'twice_daily' и т.п.

    // Для ONE_TIME (разовое напоминание)
    triggerAt?: string; // ISO 8601
};

type ReqType = {
    patientId: string;
    recordType: 'PRESCRIPTION' | 'APPOINTMENT' | 'LAB_TEST' | 'VACCINATION';
    recordId: string;
    medicationName?: string;
    dosage?: string;
    notificationSettings?: {
        // null = без ограничений (повторы по repeatInterval до отмены/выполнения)
        repeatCount?: number | null;
        repeatInterval?: number;
    };
    // Окно отправки/повторов (HH:mm). Если не задано — отправляем всегда.
    notificationWindowFrom?: string | null;
    notificationWindowTo?: string | null;
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
    rule: ReminderRuleDto;
};

type ResType = {
    success: boolean;
    reminderIds: string[];
    count: number;
};

export class ReminderCreateFromRuleRpcContract extends IBaseRpcContract<ReqType, ResType> {
    static readonly cmd = 'reminders.create.from_rule';
    readonly cmd = ReminderCreateFromRuleRpcContract.cmd;
}

