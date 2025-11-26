import { IBaseEventContract } from './events.interface';

export type AppointmentUpdatedEventData = {
    id: string;
    userId: string;
    status?: string;
    doctorId?: string;
    clinicId?: string;
    type?: string;
    title?: string;
    description?: string;
    startTime?: Date | string;
    endTime?: Date | string;
};

export class AppointmentUpdatedEventContract
    implements IBaseEventContract<AppointmentUpdatedEventData>
{
    static readonly pattern = 'appointment.updated';
    readonly pattern = AppointmentUpdatedEventContract.pattern;
    readonly data: AppointmentUpdatedEventData;

    constructor(data: AppointmentUpdatedEventData) {
        this.data = data;
    }
}

