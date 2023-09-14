import { Controller, Get, Post, Body, Req, Patch, Param } from '@nestjs/common';
import { Note } from 'src/models/note.entity';
import { NotesService } from './notes.service';
import { Request } from 'express';
import { UpdateResult } from 'typeorm';


@Controller('notes')
export class NotesController {

    constructor(
        private readonly noteService: NotesService
    ) { }

    @Post()
    create(@Body() payload: Note, @Req() request: Request): Promise<Note> {
        payload.user = request["sub"];
        const newNote = this.noteService.create(payload);
        return newNote;
    }

    @Get()
    async allNotes(@Req() request: Request): Promise<Note[]> {
        const notes = this.noteService.get(request["sub"]);
        return notes;
    }

    @Patch('/:note_id')
    async updateNote(
        @Param() params: any,
        @Body() payload: Note, 
        @Req() request: Request
    ): Promise<UpdateResult> {
        payload.user = request["sub"];
        payload.id = params.note_id;
        const result = this.noteService.patch(request["sub"], payload);
        return result
    }
}
