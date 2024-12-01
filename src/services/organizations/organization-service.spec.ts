import { beforeEach, describe, expect, it } from 'vitest'
import { OrganizationService } from './organization-service'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'

let organizationRepository: InMemoryOrganizationRepository
let organizationService: OrganizationService

describe('Organization Service', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    organizationService = new OrganizationService(organizationRepository)
  })

  it('should be able to create a new organization', async () => {
    const { organization } = await organizationService.create({
      name: 'John Doe',
      email: 'lYnVt@example.com',
      password: '123456',
      zip_code: '123456',
      address: '123456',
      city: '123456',
      responsible_name: '123456',
      phone: '123456',
    })

    expect(organization).toHaveProperty('id')
  })

  it('should be able to find all organizations', async () => {
    await organizationService.create({
      name: 'John Doe',
      email: 'lYnVt@example.com',
      password: '123456',
      zip_code: '123456',
      address: '123456',
      city: '123456',
      responsible_name: '123456',
      phone: '123456',
    })

    const { organizations } = await organizationService.findAll({
      query: 'John Doe',
      page: 1,
    })

    expect(organizations).toHaveLength(1)
    expect(organizations).toEqual([
      expect.objectContaining({ name: 'John Doe' }),
    ])
  })
})
