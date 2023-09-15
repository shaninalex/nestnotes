import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import * as argon2 from "argon2";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(user: Partial<User>): Promise<User> {
        const hash = await argon2.hash(user.password);
        user.password = hash;
        const newuser = this.userRepository.create(user);
        return this.userRepository.save(newuser);
    }

    async findOne(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email } });
    }
}
