import { ClientProxy } from '@nestjs/microservices';
import { IBaseEventContract } from '../contracts/events/events.interface';

export class EventClient {

    static readonly serviceName = 'RABBIT';
    readonly serviceName = EventClient.serviceName;

    static readonly exchange = 'events';
    readonly exchange = EventClient.exchange;

    constructor(private client: ClientProxy) {}

    emit<T extends IBaseEventContract<any>>(
        eventClass: { new (...args: any[]): T; pattern: string },
        data: T['data'],
    ): void {
        this.client.emit(eventClass.pattern, data);
    }

}
