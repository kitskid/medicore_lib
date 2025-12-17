import { IBaseEventContract } from './events.interface';

type ReqType = {
    email: string;
    code: string;
};

export class AuthEmailCodeSentEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'auth.email.code.sent';
    readonly pattern = AuthEmailCodeSentEventContract.pattern;
    readonly data: ReqType;
}


