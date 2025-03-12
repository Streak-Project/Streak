import { Controller, Post, Body, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { user_id: string; password: string }) {
        const user = await this.authService.validateUser(body.user_id, body.password);
        if (!user) {
            return { message: 'Invalid credentials' };
        }
        return this.authService.login(user);
    }

    @Post('protected')
    @UseGuards(AuthGuard('jwt'))
    protectedEndpoint(@Request() req) {
        return { message: 'Authorized', user: req.user};
    }
}