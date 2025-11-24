export interface IBaseRpcContract<Req, Res> {
    readonly cmd: string;
    readonly data: Req;
    readonly response: Res;
}
