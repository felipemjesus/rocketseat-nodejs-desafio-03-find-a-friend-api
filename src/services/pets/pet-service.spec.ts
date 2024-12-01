import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { PetService } from './pet-service'

let petRepository: InMemoryPetRepository
let petService: PetService

describe('Pet Service', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    petService = new PetService(petRepository)
  })

  it('should be able to create a new pet', async () => {
    const { pet } = await petService.create({
      name: 'John Doe',
      description: 'John Doe',
      age: 'puppy',
      size: 'small',
      energy: 'low',
      independence: 'low',
      environment: 'small',
      organization_id: 'John Doe',
    })

    expect(pet).toHaveProperty('id')
  })

  it('should be able to find all pets', async () => {
    await petService.create({
      name: 'John Doe',
      description: 'John Doe',
      age: 'John Doe',
      size: 'John Doe',
      energy: 'John Doe',
      independence: 'John Doe',
      environment: 'John Doe',
      organization_id: 'John Doe',
    })

    const { pets } = await petService.findAll({ query: 'John Doe', page: 1 })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'John Doe' })])
  })
})
