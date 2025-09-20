import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { DeferredExecutorService } from './deferred-executor.service';

@Controller()
export class RmqController {
  private readonly logger = new Logger(RmqController.name);
  constructor(private readonly executor: DeferredExecutorService) {}

  @EventPattern('order-placed')
  async handleMessage(@Payload() msg: any, @Ctx() context: RmqContext) {
    this.logger.log('Handling message from queue:', msg);
    return this.executor.execute(msg);
  }
}
