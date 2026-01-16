import { IBaseEventContract } from './events.interface';

type ReqType = {
    phone: {
        national: string;
        countryCode: string;
        isoCode: string;
    };
    code: string;
};

export class AuthForgotPasswordPhoneCodeSentEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'auth.forgot-password.phone.code.sent';
    readonly pattern = AuthForgotPasswordPhoneCodeSentEventContract.pattern;
    readonly data: ReqType;
}
