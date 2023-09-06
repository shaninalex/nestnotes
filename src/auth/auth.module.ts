import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        UsersModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              secret: configService.get<string>('SECRET'),
              global: true,
              signOptions: { expiresIn: '1d' }
            }),
            inject: [ConfigService],
        })
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { }
