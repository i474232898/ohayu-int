import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);
  update(id: string, dto: { name: string }) {
    this.logger.log('Updating user', id, dto);
  }
}
