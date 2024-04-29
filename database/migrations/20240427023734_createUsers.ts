import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Users', (table) => {
    table.increments('id').primary(),
    table.string('name').notNullable(),
    table.string('email').notNullable(),
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {

  await knex.schema.dropTable('Users')
}

