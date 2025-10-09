import type { PaginationParams } from "../../utils/pagination-params";
import type { Team } from "../Entites/Team";

export interface ITeamRepository {
    create(team: Team): Promise<Team>
    fetchMany( param:PaginationParams):Promise<Team[]>
    findByTeamName(TeamName: string): Promise<Team | undefined>
    findByEmail(Email: string): Promise<Team | undefined>
    findById(Id: string): Promise<Team | undefined>
    fetchMany( param:PaginationParams):Promise<Team[]>
    findAll(): Promise<Team[]>
    save(team: Team): Promise<void>
    delete(team: Team): Promise<void>
}