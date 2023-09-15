import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { Note } from '../models/note.entity';


@Injectable()
export class NotesService {
    constructor(
        @InjectRepository(Note)
        private readonly noteRepository: Repository<Note>,
    ) { }

    async create(note: Partial<Note>): Promise<Note> {
        const newNote = this.noteRepository.create(note);
        return this.noteRepository.save(newNote);
    }

    async getOne(user_id: number, note_id: number): Promise<Note> {
        const note = await this.noteRepository.createQueryBuilder("note")
            .where('note.user = :user_id AND note.id = :note_id', { user_id, note_id })
            .getOne();

        if (!note) {
            throw new NotFoundException('Note not found');
        }
        return note;
    }

    async get(user_id: number): Promise<Note[]> {
        const notes = this.noteRepository.createQueryBuilder("note")
            .where('note.user = :user_id', { user_id })
            .getMany();

        if (!notes) {
            throw new NotFoundException('No notes found for the user');
        }
        return notes;
    }

    async patch(user_id: number, payload: Partial<Note>): Promise<UpdateResult> {
        const where: FindOptionsWhere<Note> = { "id": payload.id, "user": user_id };
        return this.noteRepository.update(where, payload);
    }

    async delete(user_id: number, note_id: number): Promise<DeleteResult> {
        const where: FindOptionsWhere<Note> = { "id": note_id, "user": user_id };
        return this.noteRepository.delete(where);
    }
}
