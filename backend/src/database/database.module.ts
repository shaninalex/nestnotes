import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "src/models/user.entity";
import { Note } from 'src/models/note.entity';


@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                url: configService.get("DATABASE_URL"),
                entities: [
                    User,
                    Note
                ],
                synchronize: true
            })
        })
    ]
})
export class DatabaseModule {}
