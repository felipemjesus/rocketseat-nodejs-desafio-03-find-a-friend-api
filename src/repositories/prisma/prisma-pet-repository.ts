import { Pet, Prisma } from '@prisma/client'
import { PetRepository } from '../pet-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetRepository implements PetRepository {
  async findAll(query: string, page: number): Promise<Pet[]> {
    return await prisma.pet.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
  }

  async findById(id: string): Promise<Pet | null> {
    return await prisma.pet.findUnique({
      where: {
        id,
      },
    })
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    return await prisma.pet.create({
      data,
    })
  }
}
