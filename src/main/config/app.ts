import { fastify } from "fastify"
import { UserRoutes } from "../routes/user";

export const app = fastify()

app.register(UserRoutes,{
  prefix:'/api/'
});