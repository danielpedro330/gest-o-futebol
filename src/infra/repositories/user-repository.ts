import type { User } from "@/domain/Entites/User";
import type { IUserRepository } from "@/domain/repositories/user-repository";
import type { PaginationParams } from "@/utils/pagination-params";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export class UserRepository implements IUserRepository{
    
    async create(user: User): Promise<User> {
        return await prisma.user.create({
            data: {
                id: user.id.toValue(),
                name: user.name,
                email: user.email,
                password: user.password,
                status: user.status,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
        });
    }

    async fetchMany(param: PaginationParams): Promise<User[]> {
        const users = await prisma.user.findMany({
            skip: param.page * param.pageSize,
            take: param.pageSize,
            orderBy: { createdAt: 'desc' }
        });
        return users as User[];
    }


    async findByUserName(userName: string): Promise<User | undefined> {
        const user = await prisma.user.findFirst({ where: { name: userName } });
        return user as User | undefined;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await prisma.user.findUnique({ where: { email } });
        return user as User | undefined;
    }

    async findByUserNameOrEmail(data: string): Promise<User | undefined> {
        return await prisma.user.findFirst({
            where: {
                OR: [ { name: data }, { email: data } ]
            }
        }) as User | undefined;
    }

    async findById(id: string): Promise<User | undefined> {
        const user = await prisma.user.findUnique({ where: { id } });
        return user as User | undefined;
    }

    async findAll(): Promise<User[]> {
        const users = await prisma.user.findMany();
        return users as User[];
    }

    async save(user: User): Promise<void> {
        await prisma.user.update({
            where: { id: user.id.toValue() },
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                status: user.status,
                updatedAt: user.updatedAt,
            }
        });
    }

    async delete(user: User): Promise<void> {
        await prisma.user.delete({ where: { id: user.id.toValue() } });
    }
    
}