export interface IcreateTeamRequest{
    id: string;
    name: string;
    logo: string;
    email: string;
    password_hash: string;
    rank: string;
}
export interface IcreateTeamResponse{
    team: string;
}

export interface IcreateUser{
    execute(team:IcreateTeamRequest):Promise<IcreateTeamResponse>;
}