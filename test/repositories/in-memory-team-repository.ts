import type { Team } from "@/domain/Entites/Team";
import type { ITeamRepository } from "@/domain/repositories/team-repository";
import type { PaginationParams } from "@/utils/pagination-params";

export class InMemoryTeamRepository implements ITeamRepository {
    public item:Team[]=[]

    async create(team: Team) {
        this.item.push(team)

        return team
    }

    async findByTeamName(TeamName: string) {
        return this.item.find(item=> item.name==TeamName)
    }

    async findByEmail(Email: string) {
        return this.item.find(item=> item.email==Email)
    }

    async findById(Id: string) {
        return this.item.find(item=> item.id.toString()==Id)
    }

    async fetchMany(param: PaginationParams): Promise<Team[]> {
        return this.item.filter(item=> item.name.includes(param.search ? param.search: ""))
        .slice((param.page - 1) * 20, param.page * 20)
    }

    async findAll() {
        return this.item
    }

    async save(team: Team) {
        const IndexId= this.item.findIndex((item)=> item.id===team.id)
        this.item[IndexId] = team
    }
    async delete(team: Team) {
        const IndexInd= this.item.findIndex((item)=> item.id===team.id)
        this.item.splice(IndexInd,1)
    }

}