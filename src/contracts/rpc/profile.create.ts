import { IBaseRpcContract } from './rpc.interface';

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
};

type ResType = {
    success: boolean;
};

export class ProfileCreateRpcContract extends IBaseRpcContract<ReqType, ResType> {
    static readonly cmd = 'profile.create';
    readonly cmd = ProfileCreateRpcContract.cmd;
}
