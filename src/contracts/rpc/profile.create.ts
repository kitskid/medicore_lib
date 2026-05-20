import { IBaseRpcContract } from './rpc.interface';

type AddressDto = {
    country?: string;
    region?: string;
    city?: string;
    street?: string;
    house?: string;
    apartment?: string;
    postalCode?: string;
};

type EmergencyContactDto = {
    fullName: string;
    relation: string;
    phone: string;
};

type ReqType = {
    firstName: string;
    lastName: string;
    patronymic?: string;
    userId: string;
    email: string;
    phone?: {
        national: string;
        countryCode: string;
        isoCode: string;
    };
    address?: AddressDto;
    emergencyContact?: EmergencyContactDto;
};

type ResType = {
    success: boolean;
};

export class ProfileCreateRpcContract extends IBaseRpcContract<ReqType, ResType> {
    static readonly cmd = 'profile.create';
    readonly cmd = ProfileCreateRpcContract.cmd;
}
