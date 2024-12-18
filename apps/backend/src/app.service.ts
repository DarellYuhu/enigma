import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  serverTest() {
    return { message: 'Server is running' };
  }
}
