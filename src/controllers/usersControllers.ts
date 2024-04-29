import { knex } from "../knex/database"
import { FastifyRequest,  FastifyReply} from 'fastify'
import { checkUserExist } from "../utils/checkUserExist"

export class usersControllers {
  async create(req:FastifyRequest, res:FastifyReply) {
    const { name, email } = req.body as { name: string, email: string}

    const userExist = await checkUserExist(undefined, email)

    if(userExist){
      return res.status(401).send({
        error: 'Email ja esta em uso'
      })
    }
   
    await knex('Users').insert({
      name,
      email
    })
    

    return res.status(201).send()
    
  }

  async update(req:FastifyRequest, res:FastifyReply) {
    const { id } = req.params as {id:number}
    const { name, email } = req.body as {name?: string, email:string}

    
    const emailUsed = await checkUserExist(undefined, email)
    const user = await checkUserExist(id)


    if(!emailUsed || email === user?.email) {

      await knex('Users').where('id', id).update({
        name: name || user?.name,
        email,
        updated_at: knex.fn.now()
      })

      return res.status(201).send()
    }
    

    res.send({
      error: 'email ja esta em uso'
    })
  }
}