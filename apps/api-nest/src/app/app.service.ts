import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData() {
    return { message: 'Nest API ok' };
  }
}
