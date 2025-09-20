import { Injectable } from '@nestjs/common';
import { MethodService, ExecMessage } from 'nest-invoke';

@Injectable()
export class AppService {
  constructor(private methodService: MethodService) {}

  async renameUserLater(id: string, newName: string) {
    const msg: ExecMessage = {
      providerToken: 'UserRepository',
      method: 'update',
      args: [id, { name: newName }],
    };
    this.methodService.sendMessage(msg);
  }
}
