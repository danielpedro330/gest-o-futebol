import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { registerUseCase } from "../../use-cases/register.js";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const teamShemma = z.object({
        name: z.string(),
        logo: z.string(),
        email: z.email(),
        password: z.string().min(6),
        rank: z.string()
    })

    const { name, logo, email, password, rank } = teamShemma.parse(request.body)

    try {
        await registerUseCase({
            name,
            email,
            logo,
            password,
            rank,
        })
    } catch(err) {
        return reply.status(409).send()
    }

    return reply.status(201).send()
}