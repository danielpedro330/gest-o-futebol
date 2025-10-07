import { Entity } from "./Entity";


export interface TeamProps{
    name:string;
    initials:string;
    country:string;
    league:string;
}

export class Team extends Entity<TeamProps>{

}