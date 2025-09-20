import { Module } from '@nestjs/common';
import { DeferredExecutorService } from './deferred-executor.service';
import { RmqController } from './rmq.controller';
import { UserRepository } from './user.repository';
import { RemoteMethodModule } from 'nest-invoke';

export type Providers = UserRepository;
export type Methods = 'update';

@Module({
  imports: [RemoteMethodModule],
  controllers: [RmqController],
  providers: [
    DeferredExecutorService,
    UserRepository,

    { provide: 'UserRepository', useExisting: UserRepository },
  ],
})
export class WorkerModule {}
