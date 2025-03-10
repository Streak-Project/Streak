export class CreateUserDto {
    email: string;
    user_id: string;
    password: string;
}

export class LoginUserDto {
    user_id: string;
    password: string;
}