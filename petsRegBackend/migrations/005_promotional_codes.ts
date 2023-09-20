/* tslint:disable await-promise */
import Knex from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('promotional_codes', table => {
    table.uuid('id').primary();
    table.string('code', 255).unique();
    table.string('description', 255);
    table.float('discount_amount');
    table.float('discount_percentage');
    table.date('start_date');
    table.date('end_date');
    table.string('status', 50);
    table.integer('max_uses');
    table.integer('current_uses').defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}


export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
