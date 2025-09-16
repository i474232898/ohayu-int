import { RmqContext } from '@nestjs/microservices';
import { DeferredExecutorService } from './deferred-executor.service';
export declare class RmqController {
    private readonly executor;
    private readonly logger;
    constructor(executor: DeferredExecutorService);
    handleMessage(msg: any, context: RmqContext): Promise<void>;
}
