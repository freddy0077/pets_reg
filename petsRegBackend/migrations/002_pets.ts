/* tslint:disable await-promise */
import Knex from 'knex'

// import MigrationUtils from '../src/utils/MigrationUtils'

export async function up(knex: Knex) {
  await knex.schema.createTable('pets', table => {
    table.uuid('id').primary();
    table.uuid("user_id")
    table.uuid("doctor_id")
    table.string('pet_name', 255);
    table.date('dob');
    table.string('sex', 10); // Assuming a simple Male, Female, Other categorization.
    table.string('pet_type', 255);
    table.string('breed', 255);
    table.string('special_mark', 255);
    table.integer('age');  // Assuming age as a whole number.
    table.string('color', 255);
    table.float('weight'); // Assuming weight can be a float.
    table.string('microchip_number', 255);
    table.text('special_notes');  // Using text because notes can be long.
    table.string('profile_picture_url', 255); // URL for the profile picture
    table.boolean("active").defaultTo(false)
    table.boolean("subscribed").defaultTo(false)
    table.timestamp('created_at');
    table.timestamp('updated_at');
    table.boolean('terms_accepted').defaultTo(false);
  });
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
