import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('ORDERS_SERVICE') private rabbitClient: ClientProxy) {}

  async renameUserLater(id: string, newName: string) {
    const msg = {
      providerToken: 'UserRepository',
      method: 'update',
      args: [1, { name: '1' }],
    };
    this.rabbitClient.emit('order-placed', msg);
  }
}
