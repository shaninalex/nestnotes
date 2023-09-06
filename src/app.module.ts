import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env"
        }),
        DatabaseModule,
        UsersModule,
        NotesModule,
   ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
