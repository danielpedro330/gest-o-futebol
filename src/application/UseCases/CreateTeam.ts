import type { IcreateTeam, IcreateTeamRequest, IcreateTeamResponse } from '../protocols/usecases/IcreateTeam.js'

export class CreateTeam implements IcreateTeam {
    constructor() {}

    execute({ name, logo, email, password_hash, rank }: IcreateTeamRequest): Promise<IcreateTeamResponse> {
        throw new Error('Method not implemented.');
    }

}