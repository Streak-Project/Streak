import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, LoginUserDto, PersonalSettingDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async register(createUserDto: CreateUserDto): Promise<User> {
        const newUser = this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
    }

    async login(loginUserDto: LoginUserDto): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ user_id: loginUserDto.user_id});
        if (user && user.password === loginUserDto.password) {
            return user;
        }
        return null;
    }

    async setting(userId: string, personalSettingDto: PersonalSettingDto): Promise<User> {
        const user = await this.userRepository.findOneBy({ user_id: userId }); // user_id를 이용하여 사용자 조회 
        if (!user) {
            throw new UnauthorizedException('User not found');
        } // 사용자가 존재하지 않으면 UnauthorizedException 발생 
        Object.assign(user, personalSettingDto); // personalSettingDto 객체의 내용을 user 객체에 덮어쓰기 -> user 객체 변경 
        return this.userRepository.save(user); // 수정된 user 객체 저장 
    }
}