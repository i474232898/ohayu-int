import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/demo/:id/:name')
  async demo(@Param('id') id: string, @Param('name') name: string) {
    await this.appService.renameUserLater(id, name);

    return { enqueued: true, id, name };
  }
}
