import { IBaseEventContract } from "./events.interface";

type ReqType = {
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

export class AppointmentUpdatedEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'calendar.appointment.updated';
    readonly pattern = AppointmentUpdatedEventContract.pattern;
    readonly data: ReqType;
}

