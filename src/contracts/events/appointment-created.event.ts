import { IBaseEventContract } from './events.interface';

export type AppointmentCreatedEventData = {
    id: string;
    userId: string;
    doctorId?: string;
    clinicId?: string;
    type: string;
    title?: string;
    description?: string;
    startTime: Date | string;
    endTime: Date | string;
};

export class AppointmentCreatedEventContract
    implements IBaseEventContract<AppointmentCreatedEventData> {
    static readonly pattern = 'appointment.created';
    readonly pattern = AppointmentCreatedEventContract.pattern;
    readonly data: AppointmentCreatedEventData;

    constructor(data: AppointmentCreatedEventData) {
        this.data = data;
    }
}

