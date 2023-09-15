import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotesController } from './notes.controller';
import { UserService } from '../user/user.service';
import { User } from '../models/user.entity';
import { NotesService } from './notes.service';
import { Note } from '../models/note.entity';


describe('NotesController', () => {
    let controller: NotesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                NotesController,
            ],
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository
                },
                NotesService,
                {
                    provide: getRepositoryToken(Note),
                    useClass: Repository
                }
            ]
        }).compile();

        controller = module.get<NotesController>(NotesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
