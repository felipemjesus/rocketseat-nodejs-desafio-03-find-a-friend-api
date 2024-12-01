import { FastifyInstance } from 'fastify'
import { create } from './create/create-controller'
import { find } from './find/find-controller'
import { get } from './get/get-controller'

export const petsRoutes = async (app: FastifyInstance) => {
  app.post('/pets', create)
  app.get('/pets', find)
  app.get('/pets/:id', get)
}
