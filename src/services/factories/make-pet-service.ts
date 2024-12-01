import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { PetService } from '../pets/pet-service'

export const makePetService = () => {
  const petRepository = new PrismaPetRepository()
  return new PetService(petRepository)
}
