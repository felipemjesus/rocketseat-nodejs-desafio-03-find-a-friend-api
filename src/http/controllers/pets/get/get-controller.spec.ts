import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Get Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet', async () => {
    await prisma.state.create({
      data: {
        id: 'cde835e4-ea57-4acb-b1e5-e602741e8504',
        name: 'Distrito Federal',
        abbr: 'DF',
      },
    })

    await prisma.city.create({
      data: {
        id: 'b76c0176-7289-44ae-bcc0-1f99b8ccc89a',
        name: 'Distrito Federal',
        state_id: 'cde835e4-ea57-4acb-b1e5-e602741e8504',
      },
    })

    const responseOrganization = await request(app.server)
      .post('/organizations')
      .send({
        name: 'John Doe SA',
        email: 'j4oKQ@example.com',
        password: '123456',
        zip_code: '12345678',
        address: 'Av John Doe',
        city: 'b76c0176-7289-44ae-bcc0-1f99b8ccc89a',
        responsible_name: 'John Doe',
        phone: '5561987654321',
      })

    const { id: organization_id } = responseOrganization.body.organization

    const responsePet = await request(app.server).post('/pets').send({
      name: 'John Doe',
      description: 'John Doe',
      age: 'PUPPY',
      size: 'SMALL',
      energy: 'LOW',
      independence: 'LOW',
      environment: 'SMALL',
      organization_id,
    })

    const response = await request(app.server)
      .get(`/pets/${responsePet.body.pet.id}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({ name: 'John Doe' }),
    )
  })
})
