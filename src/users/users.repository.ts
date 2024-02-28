import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { dbConstants } from "src/db/constants/db.constants";

@Injectable()
export class UsersRepository {

    constructor(
        @Inject(dbConstants.mysqlConnection) private db: any,
    ) { }

    async save(createUserDto: CreateUserDto) {
        try {
            const sql = `INSERT INTO user (name, email, password) VALUES ("${createUserDto.name}", "${createUserDto.email}", "${createUserDto.password}")`;
            await this.db.query(sql);
        } catch (error) {
            return {
                error: {
                    message: error.message,
                    code: error.code,
                },
            };
        }
    }

    async findAll() {
        try {
            const query = `SELECT id, name, email, rol FROM user`;
            const [rows] = await this.db.query(query);
            return rows;
        } catch (error) {
            return {
                error: {
                    message: error.message,
                    code: error.code,
                },
            };
        }
    }

    async findOneBy({ email = '', name = '' }) {
        try {
            if (!!email) {
                const query = `SELECT id, name, email, rol, password FROM user WHERE email = "${email}"`;
                const [rows] = await this.db.query(query);
                return !!rows?.length ? rows[0] : null;
            } else if (!!name) {
                const query = `SELECT id, name, email, rol, password FROM user WHERE name = "${name}"`;
                const [rows] = await this.db.query(query);
                return !!rows?.length ? rows[0] : null;
            } else {
                return {
                    error: {
                        message: 'No se especifico un campo de busqueda',
                    },
                };
            }
        } catch (error) {
            return {
                error: {
                    message: error.message,
                    code: error.code,
                },
            };
        }
    }
}