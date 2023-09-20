/* tslint:disable await-promise */
import Knex from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('pricing_tiers', table => {
    table.uuid('id').primary();
    table.uuid('plan_id').references('id').inTable('subscription_plans');
    table.string('name', 255);
    table.float('price');
    table.text('features');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}


export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
