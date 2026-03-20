import { IBaseEventContract } from './events.interface';

type ReqType = {
    fileId: string;
    correlationId: string;
};

export class FileDeleteEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'file.delete';
    readonly pattern = FileDeleteEventContract.pattern;
    readonly data: ReqType;
}
