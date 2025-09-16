// rmq.controller.ts
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { DeferredExecutorService } from './deferred-executor.service';

@Controller()
export class RmqController {
  constructor(private readonly executor: DeferredExecutorService) {}

  @EventPattern('order-placed')
  async handleMessage(@Payload() msg: any, @Ctx() context: RmqContext) {
    console.log('Handling message from queue:', msg);
    return this.executor.execute(msg);
  }
}
