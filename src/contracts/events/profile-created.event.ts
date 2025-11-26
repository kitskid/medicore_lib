import { IBaseEventContract } from './events.interface';

export type ProfileCreatedEventData = {
    userId: string;
    email: string | null;
};

export class ProfileCreatedEventContract
    implements IBaseEventContract<ProfileCreatedEventData> {
    static readonly pattern = 'profile.created';
    readonly pattern = ProfileCreatedEventContract.pattern;
    readonly data: ProfileCreatedEventData;

    constructor(data: ProfileCreatedEventData) {
        this.data = data;
    }
}

