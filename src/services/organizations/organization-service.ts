import { OrganizationRepository } from '@/repositories/organization-repository'
import { Organization } from '@prisma/client'
import { OrganizationAlreadyExistsError } from '../errors/organization-already-exists-error'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface FindAllRequest {
  query: string
  page: number
}

interface CreateOrganizationRequest {
  name: string
  email: string
  password: string
  zip_code: string
  address: string
  city: string
  responsible_name: string
  phone: string
}

interface OrganizationsResponse {
  organizations: Organization[]
}

interface OrganizationResponse {
  organization: Organization
}

export class OrganizationService {
  constructor(private organizationRepository: OrganizationRepository) {}

  async findAll({
    query,
    page,
  }: FindAllRequest): Promise<OrganizationsResponse> {
    const organizations = await this.organizationRepository.findAll(query, page)

    return { organizations }
  }

  async findById(id: string): Promise<OrganizationResponse> {
    const organization = await this.organizationRepository.findById(id)
    if (!organization) {
      throw new ResourceNotFoundError()
    }

    return { organization }
  }

  async create({
    name,
    email,
    password,
    zip_code,
    address,
    city,
    responsible_name,
    phone,
  }: CreateOrganizationRequest): Promise<OrganizationResponse> {
    const organizationExits =
      await this.organizationRepository.findByEmail(email)
    if (organizationExits) {
      throw new OrganizationAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const organization = await this.organizationRepository.create({
      name,
      email,
      password_hash,
      zip_code,
      address,
      city_id: city,
      responsible_name,
      phone,
    })

    return { organization }
  }
}
