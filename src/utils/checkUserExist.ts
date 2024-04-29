import { knex } from "../knex/database";

export async function checkUserExist(id?:number, email?:string) {

  if(id) {
    return await knex('Users').where('id', id).first()
  }

  if(email) {
    return await knex('Users').where('email', email).first()
  }
}