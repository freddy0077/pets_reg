/* tslint:disable await-promise */
import Knex from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('transactions', table => {
    table.uuid('id').primary();
    table.uuid('subscription_id').references('id').inTable('user_subscriptions');
    table.uuid('payment_method_id').references('id').inTable('payment_methods');
    table.uuid('promo_code_id').references('id').inTable('promotional_codes');
    table.float('amount');
    table.date('date');
    table.string('status', 50);
    table.string('reference', 255);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
