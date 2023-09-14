import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.entity';
import { UserService } from '../user/user.service';
import * as argon2 from "argon2";


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
}
