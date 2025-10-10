import type { Team } from "@/domain/Entites/Team";
import type { ITeamRepository } from "@/domain/repositories/team-repository";
import type { PaginationParams } from "@/utils/pagination-params";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TeamRepository implements ITeamRepository {
    async create(team: Team): Promise<Team> {
        return await prisma.team.create({
            data: {
                id: team.id.toValue(),
                name: team.name,
                email: team.email,
                country: team.country,
                password: team.password,
                status: team.status,
            }
        })
    }

    async fetchMany(param: PaginationParams): Promise<Team[]> {
        const teams = await prisma.team.findMany({
            skip: param.page * param.pageSize,
            take: param.pageSize,
            orderBy: { createdAt: 'desc' }
        });
        return teams as Team[];
    };
        

    async findByTeamName(TeamName: string): Promise<Team | undefined> {
       const team = await prisma.tem.findFirst({ where: { name: TeamName}});
       return team as Team | undefined;
    }


    async findByEmail(Email: string): Promise<Team | undefined> {
        const team = await prisma.team.findUnique({ where: { email: Email } });
        return team as Team | undefined;
    }

    async findById(Id: string): Promise<Team | undefined> {
        const team = await prisma.team.findUnique({ where: { id: Id } });
        return team as Team | undefined;
    }


    async findAll(): Promise<Team[]> {
        const teams = await prisma.team.findMany();
        return teams as Team[];
    }

    async save(team: Team): Promise<void> {
        await prisma.team.update({
            where: { id: team.id.toValue() },
            data: {
                name: team.name,
                email: team.email,
                country: team.country,  
                password: team.password,
                status: team.status,
                updatedAt: new Date()
            }
        });
    }

    async delete(team: Team): Promise<void> {
        await prisma.team.delete({
            where: { id: team.id.toValue() }
        });
    }

}