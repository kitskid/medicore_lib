import { IBaseEventContract } from './events.interface';

type ReqType = {
    userId: string;
};

export class ProfileDeletedEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'profiles.profile.deleted';
    readonly pattern = ProfileDeletedEventContract.pattern;
    readonly data: ReqType;
}
