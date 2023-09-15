import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';


@Module({
    imports: [
        UserModule,
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
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        // JwtService, - if add this service as an provider it will complain
        // about secretOrPrivateKey must have a value. Probably due to reloading
        // config module or service...
    ],
})
export class AuthModule { }
