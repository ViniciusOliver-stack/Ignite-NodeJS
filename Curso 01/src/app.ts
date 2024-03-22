import fastify from "fastify"
import cookie from "@fastify/cookie"

import { transactions } from "./routes/transactions"

const app = fastify()

app.register(cookie)

app.addHook("preHandler", async (request, reply) => {
  console.log(`[${request.method}] ${request.url}`)
})

app.register(transactions, {
  prefix: "transactions",
})

export { app }
