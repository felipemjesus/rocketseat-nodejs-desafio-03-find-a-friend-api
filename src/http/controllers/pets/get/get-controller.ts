import { makePetService } from '@/services/factories/make-pet-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const get = async (request: FastifyRequest, reply: FastifyReply) => {
  const getPetParams = z.object({
    id: z.string().uuid(),
  })

  const { id } = getPetParams.parse(request.params)

  const petService = makePetService()

  const { pet } = await petService.findById(id)

  return reply.status(200).send({ pet })
}
