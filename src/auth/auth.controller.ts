import { Controller, HttpStatus, Post, Get, Res, Req, HttpCode, Body, UseGuards, Request as Reqq } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './auth.public-routes';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // TODO: get request to show html template.
    @Public()
    @UseGuards(AuthGuard)
    @Post('login')
    async login(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<void> {
        const { access_token } = await this.authService.login(req.body.email, req.body.password);
        res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
        }).send({ status: 'ok' });
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Reqq() req: any) {
        return req.user
    }
}
