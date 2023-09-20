/* tslint:disable await-promise */
import Knex from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('user_subscriptions', table => {
    table.uuid('id').primary();
    table.uuid('user_id').references('id').inTable('users');
    table.uuid('pet_id').references('id').inTable('pets');
    table.uuid('plan_id').references('id').inTable('subscription_plans');
    table.uuid('tier_id').references('id').inTable('pricing_tiers');
    table.uuid('promo_code_id').references('id').inTable('promotional_codes');
    table.date('start_date');
    table.date('end_date');
    table.string('status', 50);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}



export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
