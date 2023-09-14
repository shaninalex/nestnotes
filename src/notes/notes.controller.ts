import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { Note } from 'src/models/note.entity';
import { NotesService } from './notes.service';
import { Request } from 'express';


@Controller('notes')
export class NotesController {

    constructor(
        private readonly noteService: NotesService
    ) { }

    @Post()
    create(@Body() payload: Note, @Req() request: Request): Promise<Note> {
        // TODO: Get user id from cookie
        payload.user = request["sub"];
        const newNote = this.noteService.create(payload);
        return newNote;
    }

    @Get()
    async allNotes(@Req() request: Request): Promise<Note[]> {
        console.log(request["sub"]);
        return [];
    }
}
