import { app } from "./app"
import { env } from "./env"

app
  .listen({
    host: "0.0.0.0", // para que o servidor fique disponível em todas as interfaces de rede do computador.
    port: env.PORT,
  })
  .then(() => {
    console.log("🚀 HTTP server running!")
  })
