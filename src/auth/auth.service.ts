import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(user_id: string, password: string): Promise<any> {
        const user = await this.userService.login({ user_id, password });
        if (user) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { id: user.user_id, sub: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}