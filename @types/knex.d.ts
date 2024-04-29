import knex, { Knex } from "knex";

declare module 'knex/types/tables' {
  export interface Tables {
    Users: {
      name: string,
      email: string,
      updated_at: Function,
    },

    Meals: {
      id: number,
      user_id: knex,
      name: string,
      description: string,
      meal_time: Date,
      within_the_diet: boolean
    }
  }
}