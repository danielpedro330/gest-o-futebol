import type { FastifyInstance } from "fastify";
import { register } from "../http/controllers/register.js"

export function routesApp(app: FastifyInstance) {

    app.post('/users', register)
}