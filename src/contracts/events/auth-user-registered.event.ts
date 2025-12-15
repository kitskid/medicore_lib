import { IBaseEventContract } from './events.interface';

type ReqType = {
    firstName: string;
    lastName: string;
    patronymic?: string;
    email: string;
    phone: {
        national: string;
        countryCode: string;
        isoCode: string;
    };
    emailCode: string;
    smsCode: string;
};

export class AuthUserRegisteredEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'auth.user.registered';
    readonly pattern = AuthUserRegisteredEventContract.pattern;
    readonly data: ReqType;
}
