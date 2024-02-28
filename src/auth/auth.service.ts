import * as bcryptjs from 'bcryptjs';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async register({ password, email, name }: RegisterDto) {
        const user = await this.usersService.findOneByEmail(email);

        if (!!user?.error) {
            throw new BadRequestException(user.error);
        }

        if (!!user) {
            throw new BadRequestException('Ya existe este email');
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const res = await this.usersService.create({
            name,
            email,
            password: hashedPassword,
        });

        if (!!res?.error) {
            throw new BadRequestException(res.error);
        }

        return {
            message: 'Usuario creado correctamente',
        };
    }

    async login({ password, email }: LoginDto) {
        const user = await this.usersService.findOneByEmail(email);

        if (!!user?.error) {
            throw new BadRequestException(user.error);
        }

        if (!user) {
            throw new UnauthorizedException('Email invalido');
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Contraseña invalida');
        }

        const payload = { email: user.email };
        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            email: user.email,
        };
    }
}
