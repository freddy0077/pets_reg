/* tslint:disable await-promise */
import Knex from 'knex';

import { Database } from '../config';

/**
 * Initialize a new MySQL provider
 */
export async function create() {

    const knex = Knex({
        client: 'mysql',
        connection: {
            database: process.env.MYSQL_DB,
            user:     process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            host:     process.env.MYSQL_HOST,
            port:     Number(process.env.MYSQL_PORT),
        },
        pool: {
            min: Database.poolMin,
            max: Database.poolMax,
            idleTimeoutMillis: Database.poolIdle
        },
        acquireConnectionTimeout: 6000
    })

    // Verify the connection before proceeding
    try {
        await knex.raw('SELECT NOW()'); // MySQL also supports this query to get the current date and time

        return knex;
    } catch (error) {
        console.log("connection", error);
        throw new Error('Unable to connect to MySQL via Knex. Ensure a valid connection.');
    }
}

export default { create };
