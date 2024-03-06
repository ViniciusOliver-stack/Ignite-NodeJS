import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("transactions", (table) => {
    table.string("description")
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("transactions", (table) => {
    table.dropColumn("description")
  })
}
