import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from 'src/models/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([Note])
    ],
    providers: [NotesService],
    controllers: [NotesController],
})
export class NotesModule { }
