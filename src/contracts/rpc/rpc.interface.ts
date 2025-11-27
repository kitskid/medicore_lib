export abstract class IBaseRpcContract<Req, Res> {
    readonly abstract cmd: string;
    static readonly cmd: string;
    readonly data: Req;
    readonly response: Res;
}
