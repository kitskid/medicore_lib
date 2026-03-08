/**
 * Типы напоминаний, общие для medicore_lib (RPC-контракты) и medicore_records.
 * Должны совпадать с DTO в records (NotificationSettingsDto, ReminderOptionsDto, CustomIntervalValueDto).
 *
 * Основной сценарий: напоминания о приёмах лекарств (recordType INTAKE — один приём, recordId = intake.id).
 * Также: приём врача, анализы, вакцинация, заметки, обследования.
 */

/** Тип записи, к которой привязано напоминание. INTAKE = напоминание о конкретном приёме лекарства (одно слот-время). */
export type ReminderRecordType =
    | 'INTAKE'
    | 'PRESCRIPTION'
    | 'APPOINTMENT'
    | 'LAB_TEST'
    | 'VACCINATION'
    | 'NOTE'
    | 'DIAGNOSTIC_STUDY'
    | 'PROCEDURE';

/** Настройки повторов уведомления после времени события (repeatCount, repeatInterval в минутах). Для приёма лекарств — повторы, если пользователь не подтвердил приём. null = без ограничений. */
export interface NotificationSettings {
    repeatCount?: number | null;
    repeatInterval?: number;
}

/** Пользовательский интервал (значение + единица) для напоминания до события (в т.ч. до времени приёма лекарства). */
export interface CustomIntervalValue {
    value: number;
    unit: 'seconds' | 'minutes' | 'hours';
}

/** Настройки напоминаний ДО события. Для приёма лекарств: применяется к каждому приёму в курсе (за 5 мин до и т.д.) или к разовому triggerAt. */
export interface ReminderOptions {
    before5min?: boolean;
    before15min?: boolean;
    before30min?: boolean;
    /** @deprecated use before30min */
    before30hour?: boolean;
    before1hour?: boolean;
    before1day?: boolean;
    customInterval?: CustomIntervalValue;
    fixedTime5min?: boolean;
    fixedTime15min?: boolean;
    fixedTime30min?: boolean;
    /** @deprecated use fixedTime30min */
    fixedTime30hour?: boolean;
    fixedTime1hour?: boolean;
    fixedTime1day?: boolean;
    customFixedTime?: string;
}

/** Действие в push-уведомлении. Формируется доменным сервисом (records), пробрасывается через reminders/notification до FCM. */
export interface PushAction {
    action: string;
    title: string;
    icon?: string;
}
