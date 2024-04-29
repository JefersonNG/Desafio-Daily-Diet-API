import {FastifyRequest, FastifyReply } from "fastify";
import { knex } from "../knex/database";


export class mealsControllers {

  async create(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: number }
        
  
    const { name, description, withinTheDiet } = req.body as { 
      name: string
      description: string
      withinTheDiet: boolean 
    }
  
    await knex('Meals').insert({
      user_id: id,
      name,
      description,
      meal_time: knex.fn.now(),
      within_the_diet: withinTheDiet
    })
  }

  async delete(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: number }
    const { mealId } = req.query as { mealId: number}
    
    await knex('Meals').where({
      user_id: id,
      id: mealId
    }).delete()

    
  }

  async update(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: number }
    const { mealId } = req.query as { mealId: number}
    const { name, description, withinTheDiet } = req.body as { 
      name: string
      description: string
      withinTheDiet: boolean 
    }

    
    await knex('Meals').where({
      user_id: id,
      id: mealId
    }).update({
      name,
      description,
      within_the_diet: withinTheDiet
    })

    return res.status(201).send()
  }

  async listAll(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: number }
    
    const meals = await knex('Meals').where({
      user_id: id,
    }).orderBy('name')

    return res.send({
      meals
    })
  }

  async listSpecific(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: number }
    const { mealId } = req.query as { mealId: number}
    
    const meal = await knex('Meals').where({
      user_id: id,
      id: mealId
    })

    return res.send({
      meal
    })
  }

  async mealMetrics(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: number }
    
    const meals = await knex('Meals').where({
      user_id: id,
    })

    const mealOnDiet = meals.filter(meal => {
      return meal.within_the_diet
    })

    const mealOfDiet = meals.filter(meal => {
      return !meal.within_the_diet
    })

    const { bestOnDietSequence } = meals.reduce(
      (acc, meal) => {
        if (meal.within_the_diet) {
          acc.currentSequence += 1
        } else {
          acc.currentSequence = 0
        }

        if (acc.currentSequence > acc.bestOnDietSequence) {
          acc.bestOnDietSequence = acc.currentSequence
        }

        return acc
      },
      { bestOnDietSequence: 0, currentSequence: 0 },
    )

    return res.send({
      totalMeals: meals.length,
      mealOfDiet: mealOfDiet.length,
      mealOnDiet: mealOnDiet.length,
      bestOnDietSequence
    })
  }
  

}