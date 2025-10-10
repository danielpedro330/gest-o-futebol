import type { IHasher } from "../protocols/criptography/hash";
import type { IcreateTeam } from "../protocols/usecases/IcreateTeam";
import type { ITeamRepository } from "../../domain/repositories/team-repository";
import { InMemoryTeamRepository } from "../../../test/repositories/in-memory-team-repository";
import { CreateTeam } from "./CreateTeam";
import { describe, it, vi } from "vitest";
import { makeTeams } from "../../../test/factories/make-team";
import { EmailInUseError } from "../errors/email-alredy-exists";

interface SutTypes{
    sut: IcreateTeam,
    TeamRepositoryStub: ITeamRepository,
    HasherStub: IHasher
}

const makeHasherStub = (): IHasher => {
    class HashStub implements IHasher {
        async Hash(): Promise<string> {
            return await new Promise(resolve => { resolve('hashed_password') })
        }
    }

    return new HashStub()
}

function makeSut(): SutTypes {
    const TeamRepositoryStub = new InMemoryTeamRepository();
    const HasherStub = makeHasherStub();
    const sut = new CreateTeam(TeamRepositoryStub, HasherStub);

    return {
        sut,
        TeamRepositoryStub,
        HasherStub
    }
}

describe('Team useCase', () => {

    it('should be able create a new team', async () => {
        const { sut } = makeSut()
        const team = makeTeams({
            name: 'Team any_name',
            country: 'any_country',
            logo: 'any_logo',
            rank: '1',
            league: 'any_league',
            email: 'any_email',
            password: 'hashed_password'
        })

        const result = await sut.execute({
            name: team.name,
            logo: team.logo,
            rank: team.rank,
            league: team.league,
            country: team.country,
            email: team.email,
            password: team.password
        })
        
        expect(result.team.email).toBe('any_email')
    })

    it('should trow a error if team already exists', async () => {
        const {sut}=makeSut()

        const team = makeTeams({
            name: 'Team any_name',
            country: 'any_country',
            logo: 'any_logo',
            rank: '1',
            league: 'any_league',
            email: 'any_email',
            password: 'hashed_password'
        })

        await sut.execute({
            name: team.name,
            logo: team.logo,
            rank: team.rank,
            league: team.league,
            country: team.country,
            email: team.email,
            password: team.password
        })

        const promise = sut.execute({
            name: team.name,
            logo: team.logo,
            rank: team.rank,
            league: team.league,
            country: team.country,
            email: team.email,
            password: team.password
        })

        expect(promise).rejects.toThrow(new EmailInUseError())
    });

    it('should call Hasher with correct password', async () => {
        const { sut, HasherStub } = makeSut()
        const hashSpy = vi.spyOn(HasherStub, 'Hash')
        const team = makeTeams({ password: 'any_password' })

        await sut.execute({
            name: team.name,
            logo: team.logo,
            rank: team.rank,
            league: team.league,
            country: team.country,
            email: team.email,
            password: team.password
        })
        expect(hashSpy).toHaveBeenCalledWith('any_password')
    })
})