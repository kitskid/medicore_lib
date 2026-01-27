/**
 * Утилиты для работы с часовыми поясами
 * Использует встроенный Intl API для корректной работы с IANA timezone
 * 
 * @module utils/timezone
 */

/**
 * Создает Date объект в UTC из локального времени пользователя с учетом timezone
 * @param year Год
 * @param month Месяц (1-12)
 * @param day День
 * @param hours Часы (0-23) в локальном времени пользователя
 * @param minutes Минуты (0-59) в локальном времени пользователя
 * @param timezone IANA timezone пользователя (например, "Europe/Moscow", "America/New_York")
 * @returns Date объект в UTC
 * 
 * @example
 * ```typescript
 * // Создать дату 26 января 2026, 08:00 по московскому времени
 * const date = createDateInTimezone(2026, 1, 26, 8, 0, 'Europe/Moscow');
 * ```
 */
export function createDateInTimezone(
    year: number,
    month: number,
    day: number,
    hours: number,
    minutes: number,
    timezone: string = 'UTC',
): Date {
    if (timezone === 'UTC') {
        return new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
    }

    // Создаем строку даты/времени в формате ISO (как будто это UTC)
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
    
    // Создаем временную дату для вычисления offset
    const tempUtcDate = new Date(dateStr + 'Z');
    
    // Получаем компоненты времени в указанном timezone для этой UTC даты
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
    
    const parts = formatter.formatToParts(tempUtcDate);
    const tzYear = parseInt(parts.find(p => p.type === 'year')?.value || '0');
    const tzMonth = parseInt(parts.find(p => p.type === 'month')?.value || '0');
    const tzDay = parseInt(parts.find(p => p.type === 'day')?.value || '0');
    const tzHours = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
    const tzMinutes = parseInt(parts.find(p => p.type === 'minute')?.value || '0');
    
    // Вычисляем разницу между желаемым локальным временем и тем, что получилось в timezone
    // Это даст нам offset в миллисекундах
    const desiredLocalTime = new Date(year, month - 1, day, hours, minutes, 0);
    const actualTzTime = new Date(tzYear, tzMonth - 1, tzDay, tzHours, tzMinutes, 0);
    const offsetMs = desiredLocalTime.getTime() - actualTzTime.getTime();
    
    // Применяем offset к UTC дате
    return new Date(tempUtcDate.getTime() - offsetMs);
}

/**
 * Конвертирует UTC время в локальное время пользователя
 * @param utcDate UTC дата/время
 * @param timezone IANA timezone пользователя
 * @returns Объект с компонентами локального времени
 * 
 * @example
 * ```typescript
 * const utcDate = new Date('2026-01-26T05:00:00Z'); // 05:00 UTC
 * const local = convertUTCToLocal(utcDate, 'Europe/Moscow'); // { year: 2026, month: 1, day: 26, hours: 8, minutes: 0 }
 * ```
 */
export function convertUTCToLocal(utcDate: Date, timezone: string = 'UTC'): {
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
} {
    if (timezone === 'UTC') {
        return {
            year: utcDate.getUTCFullYear(),
            month: utcDate.getUTCMonth() + 1,
            day: utcDate.getUTCDate(),
            hours: utcDate.getUTCHours(),
            minutes: utcDate.getUTCMinutes(),
        };
    }

    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
    
    const parts = formatter.formatToParts(utcDate);
    return {
        year: parseInt(parts.find(p => p.type === 'year')?.value || '0'),
        month: parseInt(parts.find(p => p.type === 'month')?.value || '0'),
        day: parseInt(parts.find(p => p.type === 'day')?.value || '0'),
        hours: parseInt(parts.find(p => p.type === 'hour')?.value || '0'),
        minutes: parseInt(parts.find(p => p.type === 'minute')?.value || '0'),
    };
}
