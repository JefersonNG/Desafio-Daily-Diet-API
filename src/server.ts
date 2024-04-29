import fastify from "fastify"
import { usersRoutes } from "./routes/usersRoutes"
import { mealsRoutes } from "./routes/mealsRoutes"

const app = fastify()

app.register(usersRoutes, {
  prefix: 'user'
})

app.register(mealsRoutes, {
  prefix: 'meals'
})


app.listen({
  port: 3000,
  host: 'localhost'
}, (err, address) => console.log(`server running ${address}`))