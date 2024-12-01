import { makeOrganizationService } from '@/services/factories/make-organization-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const find = async (request: FastifyRequest, reply: FastifyReply) => {
  const findOrganizationQuery = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = findOrganizationQuery.parse(request.query)

  const organizationService = makeOrganizationService()

  const { organizations } = await organizationService.findAll({
    query,
    page,
  })

  return reply.status(200).send({ organizations })
}
