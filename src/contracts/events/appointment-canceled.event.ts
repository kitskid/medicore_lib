import { IBaseEventContract } from './events.interface';

export type AppointmentCanceledEventData = {
    id: string;
    userId: string;
};

export class AppointmentCanceledEventContract
    implements IBaseEventContract<AppointmentCanceledEventData>
{
    static readonly pattern = 'appointment.canceled';
    readonly pattern = AppointmentCanceledEventContract.pattern;
    readonly data: AppointmentCanceledEventData;

    constructor(data: AppointmentCanceledEventData) {
        this.data = data;
    }
}

