import { IBaseEventContract } from './events.interface';

type ReqType = {
    email: string;
    code: string;
};

export class AuthEmailConfirmedEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'auth.email.confirmed';
    readonly pattern = AuthEmailConfirmedEventContract.pattern;
    readonly data: ReqType;
}

