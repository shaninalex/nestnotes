import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health(): {status: boolean} {
    return {status: true};
  }
}
