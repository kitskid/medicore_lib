import { IBaseEventContract } from "./events.interface";

type ReqType = {
    userId: string;
};

export class ProfileUpdatedEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'profiles.profile.updated';
    readonly pattern = ProfileUpdatedEventContract.pattern;
    readonly data: ReqType;
}

