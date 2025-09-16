import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  update(id: string, dto: { name: string }) {
    console.log('Updating user', id, dto);
  }
}
