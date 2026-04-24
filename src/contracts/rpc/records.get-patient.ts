import { IBaseRpcContract } from './rpc.interface';

type ReqType = {
    patientId: string;
};

type ResType = {
    patientId: string;
    email: string | null;
    timezone: string | null;
};

export class RecordsGetPatientRpcContract extends IBaseRpcContract<ReqType, ResType> {
    static readonly cmd = 'records.get-patient';
    readonly cmd = RecordsGetPatientRpcContract.cmd;
}
