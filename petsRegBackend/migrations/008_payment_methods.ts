/* tslint:disable await-promise */
import Knex from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('payment_methods', table => {
    table.uuid('id').primary();
    table.uuid('user_id').references('id').inTable('users');
    table.string('type', 255);
    table.text('details');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}




export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
