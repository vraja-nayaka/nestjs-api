import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './types';

const statusCodes = {
  created: '201',
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getDoc(): Promise<User> {
    const response = await this.appService.getDoc();
    console.log(response);
    return response;
  }

  @Post()
  addNewDoc(): string {
    this.appService.addNewDoc();
    return statusCodes.created;
  }
}
