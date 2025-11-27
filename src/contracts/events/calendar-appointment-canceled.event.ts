import { IBaseEventContract } from "./events.interface";

type ReqType = {
    id: string;
    userId: string;
};

export class AppointmentCanceledEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'calendar.appointment.canceled';
    readonly pattern = AppointmentCanceledEventContract.pattern;
    readonly data: ReqType;
}

