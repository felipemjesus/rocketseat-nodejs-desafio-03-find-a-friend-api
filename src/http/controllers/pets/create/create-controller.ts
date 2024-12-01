import { makePetService } from '@/services/factories/make-pet-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createPetBody = z.object({
    name: z.string(),
    description: z.string(),
    age: z.string(),
    size: z.string(),
    energy: z.string(),
    independence: z.string(),
    environment: z.string(),
    organization_id: z.string(),
  })

  const {
    name,
    description,
    age,
    size,
    energy,
    independence,
    environment,
    organization_id,
  } = createPetBody.parse(request.body)

  const petService = makePetService()

  const { pet } = await petService.create({
    name,
    description,
    age,
    size,
    energy,
    independence,
    environment,
    organization_id,
  })

  return reply.status(201).send({ pet })
}
