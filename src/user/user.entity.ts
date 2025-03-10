import { Entity, Column, PrimaryGeneratedColumn, IntegerType } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: string;

    @Column()
    password: string;

    @Column({ unique: true })
    nickname: string;

    @Column()
    sex: string;

    @Column()
    address: string;

    @Column()
    email: string;

    @Column()
    status: IntegerType;

    @Column()
    status_message: string;

    @Column()
    photo: string[]

    @Column()
    follower: IntegerType;

    @Column()
    following: IntegerType;

    @Column()
    rival: IntegerType;
}