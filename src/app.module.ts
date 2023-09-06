import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env"
        }),
        NotesModule,
        DatabaseModule,
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
