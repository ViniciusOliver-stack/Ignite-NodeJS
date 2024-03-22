import { Options } from "tsup"

const config: Options = {
  external: [
    "better-sqlite3",
    "pg",
    "mysql2",
    "tedious",
    "oracledb",
    "pg-query-stream",
    "mysql",
    // Adicione aqui outras dependências que precisam ser tratadas como externas
  ],
  // Vai criar a nossa pasta com o Build realizado
  outDir: "build",
  // Outras configurações tsup aqui, se necessário
}

export default config
