import dotenv from "dotenv"
import { knex as setupKnex } from "knex"
import { env } from "./env"

dotenv.config()

export const config = {
  client: "sqlite",
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    directory: "./db/migrations",
  },
}

export const knex = setupKnex(config)
