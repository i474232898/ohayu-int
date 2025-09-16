import { RmqContext } from '@nestjs/microservices';
import { DeferredExecutorService } from './deferred-executor.service';
export declare class RmqController {
    private readonly executor;
    constructor(executor: DeferredExecutorService);
    handleMessage(msg: any, context: RmqContext): Promise<any>;
}
