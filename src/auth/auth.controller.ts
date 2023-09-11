import { Body, Controller, Post, Res } from '@nestjs/common';
import { IsEmail, IsString } from 'class-validator';
import { User } from '../models/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Public } from './auth.public-routes';


class LoginPayload {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

class RegisterPayload {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    password: string

    @IsString()
    password_confirm: string
}


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService) {}

    @Public()
    @Post('login')
    async login(@Body() payload: LoginPayload, @Res({passthrough: true}) res: Response) {
        const { access_token } = await this.authService.login(payload.email, payload.password);
        res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
        }).send({ status: 'ok' });
    }

    @Public()
    @Post('register')
    async register(@Body() payload: RegisterPayload) {
        const newuser = new User();
        newuser.email = payload.email;
        newuser.name = payload.name;
        // hash password with argon2
        newuser.password = payload.password;
        const createdUser = this.userService.create(newuser);
        return createdUser
    }
}
