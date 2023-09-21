/* tslint:disable await-promise */
import Knex from 'knex'

// import MigrationUtils from '../src/utils/MigrationUtils'

export async function up (knex: Knex) {
  // const schema = MigrationUtils.schema(knex)

  await knex.schema.createTable('users', table => {
    table.uuid('id').primary()
    table.string('title', 255).defaultTo("Dr.");
    table.string('full_name', 255);
    table.string('first_name', 255);
    table.string('last_name', 255);
    table.string('email', 255);
    table.string('username', 255);
    table.string('password', 255);
    table.string('role', 100);
    table.string('phone_number', 20);
    table.string('secondary_phone_number', 20);
    table.string('location', 255);
    table.string('address', 255);
    table.string('city', 255);
    table.string('state_province', 255);
    table.string('zip_postal_code', 20);
    table.string('country', 255);
    table.string('profile_picture_url', 255);
    table.timestamp('created_at');
    table.timestamp('updated_at');
    table.string('status', 20);
    table.timestamp('last_login_date');
    table.string('last_login_ip', 50);
  });

}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
