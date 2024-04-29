import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import { checkUserExist } from "../utils/checkUserExist";

export async function checkUser(req: FastifyRequest, res: FastifyReply) {
  const { id } = req.params as { id:number}
  
  const userExist = await checkUserExist(id)
  
  if(userExist) {
    return
  }


  return res.status(404).send({
    error: "usuario nao encontrado"
  })

  
}