import { IBaseEventContract } from './events.interface';

type ReqType = {
    email: string;
    code: string;
};

export class AuthForgotPasswordEmailCodeSentEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'auth.forgot-password.email.code.sent';
    readonly pattern = AuthForgotPasswordEmailCodeSentEventContract.pattern;
    readonly data: ReqType;
}
