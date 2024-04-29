import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Meals', (table) => {
    table.integer('id').defaultTo(knex.fn.uuid()).notNullable(),
    table.integer('user_id').references('id').inTable('Users').onDelete('CASCADE'),
    table.text('name'),
    table.text('description'),
    table.timestamp('meal_time').defaultTo(knex.fn.now()).notNullable(),
    table.boolean('within_the_diet')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('Meals')
}

