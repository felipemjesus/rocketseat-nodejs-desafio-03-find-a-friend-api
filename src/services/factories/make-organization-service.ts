import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { OrganizationService } from '../organizations/organization-service'

export const makeOrganizationService = () => {
  const organizationRepository = new PrismaOrganizationRepository()
  return new OrganizationService(organizationRepository)
}
