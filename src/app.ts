import { fastify } from "fastify"
import { routesApp } from "./http/routes.js"

export const app = fastify()

app.register(routesApp)