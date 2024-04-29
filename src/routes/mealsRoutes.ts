import { FastifyInstance} from "fastify"
import { mealsControllers } from "../controllers/mealsControllers"
import { checkUser } from "../middleware/userExist"

const meal = new mealsControllers()

export async function mealsRoutes(app:FastifyInstance) {

  app.post('/:id', {
    preHandler: checkUser
  }, meal.create)

  app.put('/:id', {
    preHandler: checkUser
  }, meal.update)
  
  app.get('/:id', {
    preHandler: checkUser
  }, meal.listAll)

  app.get('/:id/specif', {
    preHandler: checkUser
  }, meal.listSpecific)
  
  app.get('/:id/metric', {
    preHandler: checkUser
  }, meal.mealMetrics)

  app.delete('/:id', {
    preHandler: checkUser
  }, meal.delete)

}