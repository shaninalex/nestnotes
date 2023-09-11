import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { NotesModule } from './notes/notes.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env",
            isGlobal: true,
        }),
        AuthModule,
        UserModule,
        DatabaseModule,
        NotesModule,
   ],
    controllers: [AppController],
    providers: [
        AppService,
        JwtService
    ],
})
export class AppModule { }
