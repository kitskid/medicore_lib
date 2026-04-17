import { IBaseEventContract } from './events.interface';

type ReqType = {
    userId: string;
    sessionId: string;
    platform?: 'web' | 'app';
    deviceId?: string;
    terminatedAt: string;
    terminationScope: 'current' | 'single' | 'others';
};

export class AuthSessionTerminatedEventContract implements IBaseEventContract<ReqType> {
    static readonly pattern = 'auth.session.terminated';
    readonly pattern = AuthSessionTerminatedEventContract.pattern;
    readonly data: ReqType;
}
