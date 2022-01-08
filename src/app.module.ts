import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat.gateway';
import { CursorGateway } from './cursor.gateway';
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatGateway, CursorGateway],
})
export class AppModule {}
