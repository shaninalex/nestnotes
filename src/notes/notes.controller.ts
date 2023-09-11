import { Controller, Get, Post, Body } from '@nestjs/common';
import { Note } from 'src/models/note.entity';
import { NotesService } from './notes.service';


@Controller('notes')
export class NotesController {

    constructor(
        private readonly noteService: NotesService
    ) { }

    @Post()
    create(@Body() payload: Note): Promise<Note> {
        // TODO: Get user id from cookie
        payload.user = 1;
        const newNote = this.noteService.create(payload);
        return newNote;
    }

    @Get()
    async allNotes(): Promise<Note[]> {

        return [];
    }
}
