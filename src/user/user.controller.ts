import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, LoginUserDto } from "./user.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.userService.register(createUserDto);
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        const user = await this.userService.login(loginUserDto);
        if (!user) {
            return { message: 'Invalid Member' };
        }
        return user;
    }
}