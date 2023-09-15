import { Body, Controller, Post, Req, Res, Get, Response as NResponse } from '@nestjs/common';
import { User } from '../models/user.entity';
import { UserService } from '../user/user.service';
import { AuthService, LoginPayload, RegisterPayload } from './auth.service';
import { Request, Response } from 'express';
import { Public } from './auth.public-routes';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService) { }

    @Public()
    @Post('login')
    async login(@Body() payload: LoginPayload, @Res({ passthrough: true }) res: Response) {
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
        const user = await this.authService.register(payload);
        delete user["password"];
        return user
    }

    @Get('user')
    async userDetail(@Req() request: Request): Promise<User> {
        const user = await this.userService.findOne(request["user"].email);
        delete user["password"];
        return user
    }

    @Get('logout')
    async logout(@NResponse() response: Response) {
        response.clearCookie("access_token").send({ status: "logged out" });
    }
}
