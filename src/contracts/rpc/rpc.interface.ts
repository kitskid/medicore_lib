export abstract class IBaseRpcContract<Req, Res> {
    abstract readonly cmd: string;
    static readonly cmd: string;
    readonly data: Req;
    readonly response: Res;
}
