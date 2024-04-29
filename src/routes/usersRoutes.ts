import { FastifyInstance } from 'fastify'
import { usersControllers } from '../controllers/usersControllers'
import { checkUser } from '../middleware/userExist'


const users = new usersControllers()


export async function usersRoutes(app: FastifyInstance) {

  app.post('/', users.create)
  
  app.put('/:id', {
    preHandler: checkUser
  }, users.update)

}

