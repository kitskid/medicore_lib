import { IBaseEventContract } from './events.interface';

type ReqType = {
    phone: {
        national: string;
        countryCode: string;
        isoCode: string;
    };
    smsCode: string;
};

export class AuthPhoneConfirmedEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'auth.phone.confirmed';
    readonly pattern = AuthPhoneConfirmedEventContract.pattern;
    readonly data: ReqType;
}

