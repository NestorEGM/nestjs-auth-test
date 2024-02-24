import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersRepository {

    save(createUserDto: CreateUserDto) {
        return `Se creo un nuevo usuario name: ${createUserDto.name} email: ${createUserDto.email} password: ${createUserDto.password.replaceAll(/./g, '*')}`;
    }

    findAll() {
        return ['usuario 1', 'usuario 2', 'usuario 3'];
    }
}