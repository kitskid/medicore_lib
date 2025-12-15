import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout as tm } from 'rxjs';
import { IBaseRpcContract } from '../contracts/rpc/rpc.interface';

export abstract class RpcBaseClient {
    abstract readonly serviceName: string;
    abstract readonly queue: string;

    constructor(private client: ClientProxy) { }

    async send<T extends IBaseRpcContract<any, any>>(
        eventClass: { new(...args: any[]): T; cmd: string },
        data: T['data'],
        timeout = 5000,
    ): Promise<T['response']> {
        // prettier-ignore
        return firstValueFrom(
            this.client
                .send<T['response']>(
                    { cmd: eventClass.cmd },
                    data,
                )
                .pipe(tm(timeout)),
        );
    }
}
