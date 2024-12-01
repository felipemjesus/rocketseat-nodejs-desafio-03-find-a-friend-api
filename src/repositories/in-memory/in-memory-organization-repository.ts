import { Organization, Prisma } from '@prisma/client'
import { OrganizationRepository } from '../organization-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationRepository implements OrganizationRepository {
  public organizations: Organization[] = []

  async findAll(query: string, page: number): Promise<Organization[]> {
    return this.organizations
      .filter((organization) => organization.name.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = this.organizations.find(
      (organization) => organization.id === id,
    )
    if (!organization) {
      return null
    }

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.organizations.find(
      (organization) => organization.email === email,
    )
    if (!organization) {
      return null
    }

    return organization
  }

  async create(
    data: Prisma.OrganizationUncheckedCreateInput,
  ): Promise<Organization> {
    const organization = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      zip_code: data.zip_code,
      address: data.address,
      city_id: data.city_id,
      responsible_name: data.responsible_name,
      phone: data.phone,
      created_at: new Date(),
    }

    this.organizations.push(organization)

    return organization
  }
}
