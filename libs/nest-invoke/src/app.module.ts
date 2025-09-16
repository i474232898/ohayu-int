import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MethodService } from './app.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'orders-queue',
        },
      },
    ]),
  ],
  providers: [MethodService],
  exports: [MethodService],
})
export class RemoteMethodModule {}
