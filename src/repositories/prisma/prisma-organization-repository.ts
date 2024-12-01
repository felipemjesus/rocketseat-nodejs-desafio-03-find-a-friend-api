import { Organization, Prisma } from '@prisma/client'
import { OrganizationRepository } from '../organization-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrganizationRepository implements OrganizationRepository {
  async findAll(query: string, page: number): Promise<Organization[]> {
    return await prisma.organization.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
  }

  async findById(id: string): Promise<Organization | null> {
    return await prisma.organization.findUnique({
      where: {
        id,
      },
    })
  }

  async findByEmail(email: string): Promise<Organization | null> {
    return await prisma.organization.findUnique({
      where: {
        email,
      },
    })
  }

  async create(
    data: Prisma.OrganizationUncheckedCreateInput,
  ): Promise<Organization> {
    return await prisma.organization.create({
      data,
    })
  }
}
