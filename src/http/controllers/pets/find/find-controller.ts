import { makePetService } from '@/services/factories/make-pet-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const find = async (request: FastifyRequest, reply: FastifyReply) => {
  const findPetQuery = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = findPetQuery.parse(request.query)

  const petService = makePetService()

  const { pets } = await petService.findAll({
    query,
    page,
  })

  return reply.status(200).send({ pets })
}
