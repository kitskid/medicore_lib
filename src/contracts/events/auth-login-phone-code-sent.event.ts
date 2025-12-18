import { IBaseEventContract } from './events.interface';

type ReqType = {
    phone: {
        national: string;
        countryCode: string;
        isoCode: string;
    };
    smsCode: string;
};

export class AuthLoginPhoneCodeSentEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'auth.login.phone.code.sent';
    readonly pattern = AuthLoginPhoneCodeSentEventContract.pattern;
    readonly data: ReqType;
}

