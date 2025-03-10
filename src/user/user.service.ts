import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, LoginUserDto } from './user.dto';

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
}