import { Controller, Get, Post, Body, Req, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { Note } from '../models/note.entity';
import { NotesService } from './notes.service';
import { Request } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';


interface SingleNoteRequestParams {
    note_id: number
}


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

    @Get('/:note_id')
    async getNote(@Param() params: SingleNoteRequestParams, @Req() request: Request): Promise<Note> {
        const result = await this.noteService.getOne(request["sub"], params.note_id );
        return result
    }

    @Patch('/:note_id')
    async updateNote(@Param() params: SingleNoteRequestParams, @Body() payload: Note, @Req() request: Request): Promise<UpdateResult | NotFoundException> {
        payload.user = request["sub"];
        payload.id = params.note_id;
        const result = await this.noteService.patch(request["sub"], payload);
        if (result.affected === 0) {
            // note not found
            return new NotFoundException()
        }
        return result
    }

    @Delete('/:note_id')
    async deleteNote(@Param() params: SingleNoteRequestParams, @Req() request: Request): Promise<DeleteResult | NotFoundException> {
        const result = await this.noteService.delete(request["sub"], params.note_id);
        if (result.affected === 0) {
            // note not found
            return new NotFoundException()
        }
        return result
    }
}
