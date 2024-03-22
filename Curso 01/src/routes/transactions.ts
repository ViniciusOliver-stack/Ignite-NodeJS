import { FastifyInstance } from "fastify"
import { z } from "zod"
import { randomUUID } from "node:crypto"
import { knex } from "../database"
import checkSessionIdExists from "../middlewares/check-session-id-exists"

export async function transactions(app: FastifyInstance) {
  app.addHook("preHandler", async (request, reply) => {
    console.log(`[${request.method}] ${request.url}`)
  })

  app.get("/", { preHandler: [checkSessionIdExists] }, async (request) => {
    const { session_id } = request.cookies

    const transactions = await knex("transactions")
      .where("session_id", session_id)
      .select()

    return { transactions }
  })

  app.get("/:id", { preHandler: [checkSessionIdExists] }, async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { session_id } = request.cookies

    const { id } = getTransactionParamsSchema.parse(request.params)

    const transaction = await knex("transactions")
      .where({ session_id, id })
      .first()

    return { transaction }
  })

  app.get("/summary", async (request) => {
    const { session_id } = request.cookies

    const summary = await knex("transactions")
      .sum("amount", { as: "amount" })
      .where({ session_id: session_id })
      .first()

    return { summary }
  })

  app.post("/", async (request, reply) => {
    const postTransactionSchema = z.object({
      title: z.string(),
      description: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    })

    const { title, amount, description, type } = postTransactionSchema.parse(
      request.body
    )

    let session_id = request.cookies.session_id

    if (!session_id) {
      session_id = randomUUID()

      reply.cookie("session_id", session_id, {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        secure: true, // Especifica que o cookie deve ser enviado em conexões seguras
        httpOnly: true, // Especifica que o cookie não deve ser acessível via JavaScript
      })
    }

    await knex("transactions").insert({
      id: randomUUID(),
      title,
      description,
      amount: type === "credit" ? amount : amount * -1,
      session_id: session_id,
    })

    return reply.status(201).send()
  })
}
