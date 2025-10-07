import { Team } from "@/domain/Entites/Team";

export interface IcreateTeamRequest{
    name: string;
    logo: string;
    email: string;
    password: string;
    rank: string;
    country:string;
    league:string;
}
export interface IcreateTeamResponse {
    team: Team;
}

export interface IcreateTeam{
    execute(team:IcreateTeamRequest):Promise<IcreateTeamResponse>;
}