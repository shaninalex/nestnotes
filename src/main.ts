import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const configService = app.get(ConfigService);
    const port = configService.get("PORT", 8080);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(port);

    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
