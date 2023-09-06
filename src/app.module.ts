import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env"
        }),
        DatabaseModule,
        UsersModule,
        NotesModule,
        AuthModule,
   ],
    controllers: [AppController],
    providers: [
        AppService,
        JwtService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ],
})
export class AppModule { }
