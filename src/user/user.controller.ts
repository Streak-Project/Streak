import { Controller, Post, Body, UseGuards, Put, Req } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { UserService } from "./user.service";
import { CreateUserDto, LoginUserDto, PersonalSettingDto } from "./user.dto";

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

    @UseGuards(AuthGuard('jwt')) // JWT 인증 적용 
    @Put('setting') // 리소스 수정 
    async setting(@Req() req, @Body() personalSettingDto: PersonalSettingDto) { // @Req() req: req 객체를 가져와 요청산 사용자의 정보를 확인 
        const userId = req.user.user_id;
        return this.userService.setting(userId, personalSettingDto);
    }
}