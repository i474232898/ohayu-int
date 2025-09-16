import { Module } from '@nestjs/common';
import { DeferredExecutorService } from './deferred-executor.service';
import { RmqController } from './rmq.controller';
import { UserRepository } from './user.repository';

@Module({
  controllers: [RmqController],
  providers: [
    DeferredExecutorService,
    UserRepository,

    { provide: 'UserRepository', useExisting: UserRepository },
  ],
})
export class WorkerModule {}
