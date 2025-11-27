import { IBaseRpcContract } from "./rpc.interface";

type ReqType = {
    userId: string;
    displayName?: string;
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    gender?: string;
    birthDate?: string;
    avatarUrl?: string;
    bloodType?: string;
    rhFactor?: string;
    heightCm?: number;
    weightKg?: number;
    chronicDiseases?: string[];
    allergies?: string[];
    lifestyle?: string;
    address?: {
        country?: string;
        region?: string;
        city?: string;
        street?: string;
        houseNumber?: string;
        apartmentNumber?: string;
        postalCode?: string;
    };
    emergencyContact?: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        relationship?: string;
    };
};

type ResType = {
    profileId: string;
    userId: string;
    email?: string;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
    publicFields: {
        displayName?: string;
        avatarUrl?: string;
    };
};

export class CreateProfileRpcContract implements IBaseRpcContract<ReqType, ResType> {
    static readonly cmd = 'profiles.profile.create';
    readonly cmd = CreateProfileRpcContract.cmd;
    readonly data: ReqType;
    readonly response: ResType;
}

