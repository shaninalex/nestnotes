import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../models/user.entity';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Post()
    @HttpCode(201)
    async create(@Body() user: User): Promise<User> {
        const createdUser = await this.usersService.create(user);
        return createdUser;
    }
}
