import { IBaseEventContract } from './events.interface';

type ReqType = {
    phone: {
        national: string;
        countryCode: string;
        isoCode: string;
    };
    smsCode: string;
};

export class AuthPhoneCodeSentEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'auth.phone.code.sent';
    readonly pattern = AuthPhoneCodeSentEventContract.pattern;
    readonly data: ReqType;
}

