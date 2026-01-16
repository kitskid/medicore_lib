import { IBaseRpcContract } from './rpc.interface';

type ReqType = {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth?: string;
};

type ResType = {
    success: boolean;
    patientId?: string;
};

export class PatientCreateRpcContract extends IBaseRpcContract<ReqType, ResType> {
    static readonly cmd = 'patient.create';
    readonly cmd = PatientCreateRpcContract.cmd;
}
