export interface IBaseEventContract<Req> {
    readonly pattern: string;
    readonly data: Req;
}
