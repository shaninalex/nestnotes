import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.entity';
import { UserService } from '../user/user.service';
import * as argon2 from "argon2";
import { IsEmail, IsString } from 'class-validator';
import { Match } from '../internal/match.decorator';


export class LoginPayload {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class RegisterPayload {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    password: string

    @IsString()
    @Match("password")
    password_confirm: string
}



@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async login(email: string, pass: string): Promise<any> {
        const user: User = await this.userService.findOne(email);
        if (!await argon2.verify(user.password, pass)) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }

    async register(payload: RegisterPayload): Promise<User> {
        const user = new User();
        user.email = payload.email;
        user.name = payload.name;
        user.password = payload.password;
        await this.userService.create(user);
        return user
    }
}
