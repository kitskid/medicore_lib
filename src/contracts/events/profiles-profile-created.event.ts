import { IBaseEventContract } from "./events.interface";

type ReqType = {
    userId: string;
    email: string | null;
};

export class ProfileCreatedEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'profiles.profile.created';
    readonly pattern = ProfileCreatedEventContract.pattern;
    readonly data: ReqType;
}

