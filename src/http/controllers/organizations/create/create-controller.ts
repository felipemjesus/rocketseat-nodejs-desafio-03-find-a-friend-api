import { makeOrganizationService } from '@/services/factories/make-organization-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createOrganizationBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    zip_code: z.string(),
    address: z.string(),
    city: z.string(),
    responsible_name: z.string(),
    phone: z.string(),
  })

  const {
    name,
    email,
    password,
    zip_code,
    address,
    city,
    responsible_name,
    phone,
  } = createOrganizationBody.parse(request.body)

  const organizationService = makeOrganizationService()
  const { organization } = await organizationService.create({
    name,
    email,
    password,
    zip_code,
    address,
    city,
    responsible_name,
    phone,
  })

  return reply.status(201).send({ organization })
}
