import { IBaseEventContract } from "./events.interface";

type ReqType = {
    foo: string;
    boo: string;
};

export class AuthUserRegisteredEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'auth.user.registered';
    readonly pattern = AuthUserRegisteredEventContract.pattern;
    readonly data: ReqType;
}
