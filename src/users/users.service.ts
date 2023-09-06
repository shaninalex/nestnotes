import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email } });
    }

    async create(user: Partial<User>): Promise<User> {
        const newuser = this.userRepository.create(user);
        return this.userRepository.save(newuser);
    }

    async update(id: number, user: Partial<User>): Promise<User> {
        await this.userRepository.update(id, user);
        return this.userRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}