import { FastifyInstance } from 'fastify'
import { create } from './create/create-controller'
import { find } from './find/find-controller'

export const organizationsRoutes = async (app: FastifyInstance) => {
  app.post('/organizations', create)
  app.get('/organizations', find)
}
