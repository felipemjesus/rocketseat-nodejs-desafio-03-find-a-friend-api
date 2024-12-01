import { PetRepository } from '@/repositories/pet-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { $Enums, Pet } from '@prisma/client'

interface FindAllRequest {
  query: string
  page: number
}

interface CreatePetRequest {
  name: string
  description: string
  age: string
  size: string
  energy: string
  independence: string
  environment: string
  organization_id: string
}

interface PetsResponse {
  pets: Pet[]
}

interface PetResponse {
  pet: Pet
}

export class PetService {
  constructor(private petRepository: PetRepository) {}

  async findAll({ query, page }: FindAllRequest): Promise<PetsResponse> {
    const pets = await this.petRepository.findAll(query, page)

    return { pets }
  }

  async findById(id: string): Promise<PetResponse> {
    const pet = await this.petRepository.findById(id)
    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }

  async create({
    name,
    description,
    age,
    size,
    energy,
    independence,
    environment,
    organization_id,
  }: CreatePetRequest): Promise<Pet> {
    const pet = await this.petRepository.create({
      name,
      description,
      age: age as $Enums.Age,
      size: size as $Enums.Size,
      energy: energy as $Enums.EnergyLevel,
      independence: independence as $Enums.IndependenceLevel,
      environment: environment as $Enums.Environment,
      organization_id,
    })

    return { pet }
  }
}
