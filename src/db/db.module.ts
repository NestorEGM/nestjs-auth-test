import { Module } from '@nestjs/common';
import { dbConstants } from './constants/db.constants';
import { createPool } from 'mysql2/promise';

const dbProvider = {
    provide: dbConstants.mysqlConnection,
    useValue: createPool({
        host: dbConstants.host,
        user: dbConstants.user,
        password: dbConstants.password,
        database: dbConstants.database,
        port: dbConstants.port,
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
    }),
};

@Module({
    providers: [dbProvider],
    exports: [dbProvider],
})
export class DbModule { }
