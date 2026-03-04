import { IBaseRpcContract } from './rpc.interface';
import type {
    NotificationSettings,
    ReminderOptions,
    ReminderRecordType,
} from '../../types/reminder.types';

/** Курсовой приём лекарств (по расписанию) или разовое напоминание */
export type ReminderRuleType = 'COURSE' | 'ONE_TIME';

export type ReminderRuleDto = {
    type: ReminderRuleType;
    timezone?: string;
    /** Для COURSE — курс приёма лекарств: начало, длительность, частота */
    startDate?: string;
    durationDays?: number;
    frequency?: string;
    /** Для ONE_TIME — момент разового напоминания (напр. приём врача, анализ) */
    triggerAt?: string;
};

export type ReminderCreateFromRuleReq = {
    patientId: string;
    recordType: ReminderRecordType;
    recordId: string;
    /** Для напоминаний о приёмах лекарств (INTAKE): название препарата */
    medicationName?: string;
    /** Для напоминаний о приёмах лекарств (INTAKE): дозировка */
    dosage?: string;
    notificationSettings?: NotificationSettings;
    /** Окно отправки/повторов (HH:mm). Если не задано — отправляем всегда. */
    notificationWindowFrom?: string | null;
    notificationWindowTo?: string | null;
    reminderOptions?: ReminderOptions;
    rule: ReminderRuleDto;
};

type ResType = {
    success: boolean;
    reminderIds: string[];
    count: number;
};

export class ReminderCreateFromRuleRpcContract extends IBaseRpcContract<ReminderCreateFromRuleReq, ResType> {
    static readonly cmd = 'reminders.create.from_rule';
    readonly cmd = ReminderCreateFromRuleRpcContract.cmd;
}
