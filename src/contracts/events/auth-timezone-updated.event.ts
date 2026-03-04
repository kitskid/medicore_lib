import { IBaseEventContract } from './events.interface';

type ReqType = {
    userId: string;
    timezone: string; // IANA, e.g. "Europe/Moscow"
};

export class AuthTimezoneUpdatedEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'auth.timezone.updated';
    readonly pattern = AuthTimezoneUpdatedEventContract.pattern;
    readonly data: ReqType;
}
