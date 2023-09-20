import Knex from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('doctors', table => {
    table.uuid('id').primary();
    table.uuid('user_id');
    table.string('name', 255);
    table.string('email', 255).unique(); // Assuming email should be unique.
    table.string('phone', 20);
    table.string('address', 255);
    table.date('dob');
    table.string('qualification', 255);
    table.string('experience', 255); // This can be changed to integer if experience is represented in years.
    table.string('previousWorkplace', 255);
    table.string('emergencyContact', 20);
    table.string('workAvailability', 255); // This can be changed based on the format of availability.
    table.text('bio');
    table.string('specialization', 255);
    table.string('license', 255);
    table.string('password', 255); // Consider hashing the password before storing.
    table.string('profilePicture', 255); // URL for the profile picture
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
