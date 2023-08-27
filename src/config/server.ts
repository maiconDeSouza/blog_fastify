import { app } from './app'
import { env } from './env'

const port = env.PORT

app
  .listen({
    port,
  })
  .then(() => console.log(`HTTP server running on http://localhost:${port} 🚀`))
