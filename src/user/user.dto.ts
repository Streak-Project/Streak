import { IntegerType } from "typeorm";

export class CreateUserDto {
    email: string;
    user_id: string;
    password: string;
}

export class LoginUserDto {
    user_id: string;
    password: string;
}

export class PersonalSettingDto {
    password: string;
    nickname: string;
    sex: string;
    address: string;
    email: string;
    status: IntegerType;
    status_message: string;
    photo: string[];
}