import { IBaseEventContract } from './events.interface';

export type ProfileUpdatedEventData = {
    userId: string;
};

export class ProfileUpdatedEventContract
    implements IBaseEventContract<ProfileUpdatedEventData>
{
    static readonly pattern = 'profile.updated';
    readonly pattern = ProfileUpdatedEventContract.pattern;
    readonly data: ProfileUpdatedEventData;

    constructor(data: ProfileUpdatedEventData) {
        this.data = data;
    }
}

