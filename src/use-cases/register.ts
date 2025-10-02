import {hash } from "bcrypt";
import { prisma } from "../lib/prisma.js";

interface RegisterUseCaseRequest {
    name: string,
    email: string,
    logo: string,
    password: string,
    rank: string,
}

export async function registerUseCase({
    name,
    email,
    logo,
    password,
    rank,
}: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const teamWithSameEmail = await prisma.team.findUnique({
        where: {
            email,
        }
    })

    if(teamWithSameEmail) {
        throw new Error('E-mail alread exits')
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

}