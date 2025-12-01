import { IBaseEventContract } from "./events.interface";

type ReqType = {
    user_id: string;
    profile_id?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: {
        national: string;
        countryCode: string;
        isoCode: string;
    } | string;
    confirmation_codes_meta?: {
        email_code_key?: string;
        sms_code_key?: string;
    };
};

export class AuthUserRegisteredEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'auth.user.registered';
    readonly pattern = AuthUserRegisteredEventContract.pattern;
    readonly data: ReqType;
}