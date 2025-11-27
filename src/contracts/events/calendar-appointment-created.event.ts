import { IBaseEventContract } from "./events.interface";

type ReqType = {
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

export class AppointmentCreatedEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'calendar.appointment.created';
    readonly pattern = AppointmentCreatedEventContract.pattern;
    readonly data: ReqType;
}

