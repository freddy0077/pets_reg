"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
/* tslint:disable await-promise */
const knex_1 = __importDefault(require("knex"));
const config_1 = require("../config");
/**
 * Initialize a new MySQL provider
 */
function create() {
    return __awaiter(this, void 0, void 0, function* () {
        const knex = (0, knex_1.default)({
            client: 'mysql',
            connection: {
                database: process.env.MYSQL_DB,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                host: process.env.MYSQL_HOST,
                port: Number(process.env.MYSQL_PORT),
            },
            pool: {
                min: config_1.Database.poolMin,
                max: config_1.Database.poolMax,
                idleTimeoutMillis: config_1.Database.poolIdle
            },
            acquireConnectionTimeout: 6000
        });
        // Verify the connection before proceeding
        try {
            yield knex.raw('SELECT NOW()'); // MySQL also supports this query to get the current date and time
            return knex;
        }
        catch (error) {
            console.log("connection", error);
            throw new Error('Unable to connect to MySQL via Knex. Ensure a valid connection.');
        }
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=MysqlProvider.js.map