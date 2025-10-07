import { Team } from '../../domain/Entites/Team';
import type { ITeamRepository } from '../../domain/repositories/team-repository';
import { EmailInUseError } from '../errors/email-alredy-exists';
import type { IHasher } from '../protocols/criptography/hash';
import type { IcreateTeam, IcreateTeamRequest, IcreateTeamResponse } from '../protocols/usecases/IcreateTeam';

export class CreateTeam implements IcreateTeam {
    constructor(
        private readonly _TeamRepository: ITeamRepository,
        private readonly _IHasher: IHasher
    ) {}

    async execute({ name, logo, email, password, rank, country, league }: IcreateTeamRequest): Promise<IcreateTeamResponse> {
        const TeamAldreadyExists = await this._TeamRepository.findByEmail(email)

        if(TeamAldreadyExists) {
            throw new EmailInUseError()
        }

        const PasswordHash = await this._IHasher.Hash(password)

        const team = await this._TeamRepository.create(Team.Create({
            name: name,
            logo: logo,
            password: PasswordHash,
            email: email,
            rank: rank,
            country: country,
            league: league,
        }));

        return {
            team
        }
    }

}