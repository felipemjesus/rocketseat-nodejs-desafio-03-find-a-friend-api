import { $Enums, Pet, Prisma } from '@prisma/client'
import { PetRepository } from '../pet-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetRepository implements PetRepository {
  public pets: Pet[] = []

  async findAll(query: string, page: number): Promise<Pet[]> {
    return this.pets
      .filter((pet) => pet.name.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.pets.find((pet) => pet.id === id)
    if (!pet) {
      return null
    }

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age as $Enums.Age,
      size: data.size as $Enums.Size,
      energy: data.energy as $Enums.EnergyLevel,
      independence: data.independence as $Enums.IndependenceLevel,
      environment: data.environment as $Enums.Environment,
      organization_id: data.organization_id,
      created_at: new Date(),
    }

    this.pets.push(pet)

    return pet
  }
}
