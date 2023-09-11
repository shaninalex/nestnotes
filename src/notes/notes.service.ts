import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from 'src/models/note.entity';

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
}
