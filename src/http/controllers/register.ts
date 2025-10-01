import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import {hash } from "bcrypt";
import { prisma } from "../../lib/prisma.js";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const teamShemma = z.object({
        name: z.string(),
        logo: z.string(),
        email: z.email(),
        password: z.string().min(6),
        rank: z.string()
    })

    const { name, logo, email, password, rank } = teamShemma.parse(request.body)

    const password_hash = await hash(password, 6)

    const teamWithSameEmail = await prisma.team.findUnique({
        where: {
            email,
        }
    })

    if(teamWithSameEmail) {
        return reply.status(409).send()
    }

    await prisma.team.create({
        data: {
            name,
            email,
            logo,
            password_hash,
            rank,
        }
    })

    return reply.status(201).send()
}