import { Organization, Prisma } from '@prisma/client'

export interface OrganizationRepository {
  findAll(query: string, page: number): Promise<Organization[]>
  findById(id: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
  create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>
}
