import { FastifyInstance } from "fastify"
import knex from "knex"
import crypto from "node:crypto"

export async function transactions(app: FastifyInstance) {
  app.get("/hello", async () => {
    const transactions = await knex("transactions")
      .insert({
        id: crypto.randomUUID(),
        title: "Transação de teste #2",
        amount: 1000,
      })
      .returning("*")

    const transaction = await knex("transactions").select("*")

    return transaction
  })
}
