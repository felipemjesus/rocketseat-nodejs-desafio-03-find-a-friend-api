import { Pet, Prisma } from '@prisma/client'

export interface PetRepository {
  findAll(query: string, page: number): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
