import parseDbUrl from 'parse-database-url';
import 'dotenv/config';

export namespace Database {
    export const schema = 'api';
    // NOTE: DATABASE_URL format will need to change for MySQL if used.
    // export const url = process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/changeMgDB';
    // export const url = process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/changeMgDB';
    export const url = process.env.DATABASE_URL || 'mysql://pets_reg_user:M@roon$$88@localhost:3306/pets_reg_db';

    console.log("mysql db", url)

    export const config = parseDbUrl(url);
    export const { database, user, name, username, password, hostname, host, port } = config;
    export const poolMin = Number(process.env.DATABASE_POOL_MIN || '0');
    export const poolMax = Number(process.env.DATABASE_POOL_MAX || '50');
    export const poolIdle = Number(process.env.DATABASE_POOL_IDLE || '10000');
}

export namespace Server {
    export const port = Number(process.env.PORT || '8000');
    export const bodyLimit = '100kb';
    export const corsHeaders = ['Link'];
    export const isDev = process.env.NODE_ENV === 'development';
}

export namespace Knex {
    export const config = {
        client: 'mysql',
        connection: {
            host: process.env.MYSQL_HOST || Database.host,
            database: process.env.MYSQL_DB || Database.database,
            user: process.env.MYSQL_USER || Database.user,
            password: process.env.MYSQL_PASSWORD || Database.password,
            port: process.env.MYSQL_PORT || Database.port,
        },
        pool: {
            min: Database.poolMin,
            max: Database.poolMax,
            idle: Database.poolIdle,
        },
        migrations: {
            tableName: 'KnexMigrations',
        },
        seeds: {
            directory: './seeds'
        }
    }
}

export namespace Redis {
    // export const url = process.env.REDIS_URL
    export const url = "redis://127.0.0.1:6379";
}

export default { Database, Server, Knex, Redis };
