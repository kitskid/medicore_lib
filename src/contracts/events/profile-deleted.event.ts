import { IBaseEventContract } from './events.interface';

export type ProfileDeletedEventData = {
    userId: string;
};

export class ProfileDeletedEventContract
    implements IBaseEventContract<ProfileDeletedEventData>
{
    static readonly pattern = 'profile.deleted';
    readonly pattern = ProfileDeletedEventContract.pattern;
    readonly data: ProfileDeletedEventData;

    constructor(data: ProfileDeletedEventData) {
        this.data = data;
    }
}

