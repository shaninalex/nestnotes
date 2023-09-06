import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';

@Module({
    imports: [],
    controllers: [NotesController],
    providers: [NotesService]
})
export class NotesModule {}
