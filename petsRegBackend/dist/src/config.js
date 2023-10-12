"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Redis = exports.Knex = exports.Server = exports.Database = void 0;
const parse_database_url_1 = __importDefault(require("parse-database-url"));
require("dotenv/config");
var Database;
(function (Database) {
    Database.schema = 'api';
    // NOTE: DATABASE_URL format will need to change for MySQL if used.
    // export const url = process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/changeMgDB';
    // export const url = process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/changeMgDB';
    Database.url = process.env.DATABASE_URL || 'mysql://pets_reg_user:M@roon$$88@localhost:3306/pets_reg_db';
    console.log("mysql db", Database.url);
    Database.config = (0, parse_database_url_1.default)(Database.url);
    Database.database = Database.config.database, Database.user = Database.config.user, Database.name = Database.config.name, Database.username = Database.config.username, Database.password = Database.config.password, Database.hostname = Database.config.hostname, Database.host = Database.config.host, Database.port = Database.config.port;
    Database.poolMin = Number(process.env.DATABASE_POOL_MIN || '0');
    Database.poolMax = Number(process.env.DATABASE_POOL_MAX || '50');
    Database.poolIdle = Number(process.env.DATABASE_POOL_IDLE || '10000');
})(Database = exports.Database || (exports.Database = {}));
var Server;
(function (Server) {
    Server.port = Number(process.env.PORT || '8000');
    Server.bodyLimit = '100kb';
    Server.corsHeaders = ['Link'];
    Server.isDev = process.env.NODE_ENV === 'development';
})(Server = exports.Server || (exports.Server = {}));
var Knex;
(function (Knex) {
    Knex.config = {
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
    };
})(Knex = exports.Knex || (exports.Knex = {}));
var Redis;
(function (Redis) {
    // export const url = process.env.REDIS_URL
    Redis.url = "redis://127.0.0.1:6379";
})(Redis = exports.Redis || (exports.Redis = {}));
exports.default = { Database, Server, Knex, Redis };
//# sourceMappingURL=config.js.map