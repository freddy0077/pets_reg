/* tslint:disable await-promise */
import Knex from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('otp_logins', table => {
    table.uuid('id').primary();
    table.uuid('user_id',);
    table.string('otp_code');
    table.timestamp('expiration_time');
    table.boolean('used');
    table.string('channel');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
