import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersRepository {

    // TODO: Borrar
    // Solo de prueba porque no tengo BD
    private users: Array<CreateUserDto> = [
        {
            email: 'pancho@email.com',
            name: 'Pancho',
            password: '$2a$10$hPhJl6LxYQCcOMr5tujfveY7WHmRkk21drpg4hZx2LnBJc5W.Zsd.'
        },
        {
            email: 'juan@email.com',
            name: 'Juan',
            password: '$2a$10$hPhJl6LxYQCcOMr5tujfveY7WHmRkk21drpg4hZx2LnBJc5W.Zsd.'
        },
        {
            email: 'mario@email.com',
            name: 'Mario',
            password: '$2a$10$hPhJl6LxYQCcOMr5tujfveY7WHmRkk21drpg4hZx2LnBJc5W.Zsd.'
        },
    ];

    save(createUserDto: CreateUserDto) {
        this.users.push(createUserDto);
        return `Se creo un nuevo usuario name: ${createUserDto.name} email: ${createUserDto.email} password: ${createUserDto.password.replaceAll(/./g, '*')}`;
    }

    findAll() {
        return this.users;
    }

    async findOneBy({ email = '', name = '' }) {
        if (!!email) {
            const user = this.users.find(user => user.email === email);
            return user || null;
        } else if (!!name) {
            const user = this.users.find(user => user.name === name);
            return user || null;
        } else {
            return null;
        }
    }
}