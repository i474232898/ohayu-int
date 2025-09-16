import { Module } from '@nestjs/common';
import { RemoteMethodModule } from 'nest-invoke';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [RemoteMethodModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
