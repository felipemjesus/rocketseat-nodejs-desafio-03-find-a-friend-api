import fastify from 'fastify'
import { organizationsRoutes } from './http/controllers/organizations/routes'
import { ZodError } from 'zod'
import { env } from './env'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(organizationsRoutes)
app.register(petsRoutes)

app.get('/', () => {
  return 'API Find a Friend'
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like Datadog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
