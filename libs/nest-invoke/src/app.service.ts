import { Inject, Injectable } from '@nestjs/common';
import { ExecMessage } from './types';
import { ClientProxy } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MethodService {
  constructor(@Inject('ORDERS_SERVICE') private rabbitClient: ClientProxy) {}

  sendMessage(msg: ExecMessage) {
    this.rabbitClient.emit('order-placed', { id: uuidv4(), ...msg });
    console.log('>>');
  }
}
