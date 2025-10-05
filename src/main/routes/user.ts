import type { FastifyInstance } from "fastify";
import { adapterRoute } from "../adapters/fastify-routes-adapter";
import { CreateUserControllerFactory } from "../factories/user/create-user-factory";

export async function UserRoutes(app:FastifyInstance){
    app.post('/user',adapterRoute(CreateUserControllerFactory()));
}