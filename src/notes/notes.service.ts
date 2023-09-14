import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { Note } from 'src/models/note.entity';
import { of } from 'rxjs';

@Injectable()
export class NotesService {
    constructor(
        @InjectRepository(Note)
        private readonly noteRepository: Repository<Note>,
    ) {}

    async create(note: Partial<Note>): Promise<Note> {
        const newNote = this.noteRepository.create(note);
        return this.noteRepository.save(newNote);
    }

    async get(user_id: number): Promise<Note[]> {
        const where: FindOptionsWhere<Note> = {"user": user_id}; 
        return this.noteRepository.findBy(where);
    }

    async patch(user_id: number, payload: Partial<Note>): Promise<UpdateResult> {
        const where: FindOptionsWhere<Note> = {"id": payload.id, "user": user_id};
        return this.noteRepository.update(where, payload);
    }
}
