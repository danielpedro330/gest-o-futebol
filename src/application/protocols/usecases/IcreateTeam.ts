export interface IcreateTeamRequest{
    id: string;
    name: string;
    logo: string;
    email: string;
    password_hash: string;
    rank: string;
}
export interface IcreateTeamResponse{
    team: Team;
}

export interface IcreateTeam{
    execute(team:IcreateTeamRequest):Promise<IcreateTeamResponse>;
}