import { IBaseEventContract } from './events.interface';

type ReqType = {
    userId: string;
    oldEmail: string;
    newEmail: string;
    changedAt: string;
};

export class AuthEmailChangedEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'auth.email.changed';
    readonly pattern = AuthEmailChangedEventContract.pattern;
    readonly data: ReqType;
}
