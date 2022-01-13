import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from 'nestjs-firebase';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppUpdate } from './app.update';
import { ChatGateway } from './chat.gateway';
import { CursorGateway } from './cursor.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_API_TOKEN,
      include: [AppUpdate],
    }),
    AppUpdate,
    FirebaseModule.forRoot({
      googleApplicationCredential: 'firebase-adminsdk.json',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, CursorGateway],
})
export class AppModule {}
