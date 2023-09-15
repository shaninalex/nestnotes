import {
    CanActivate, ExecutionContext, Injectable, UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './auth.public-routes';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private userService: UserService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Handle public routes.
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ]
        );
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromCookies(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: this.configService.get('SECRET')
                }
            )
            if (!await this.userService.findOne(payload["email"])) {
                throw new UnauthorizedException();
            }
            request['user'] = payload
            request["sub"] = payload["sub"] // often we need only user id
        } catch {
            throw new UnauthorizedException();
        }
        return true
    }
    
    private extractTokenFromCookies(request: Request): string | undefined {
        const cookie = request.cookies["access_token"];
        return cookie;
    }

}
