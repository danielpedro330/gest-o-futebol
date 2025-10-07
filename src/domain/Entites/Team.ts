import type { Status } from '../enum/status';
import { Entity } from './Entity'

export interface TeamProps{
    name:string;
    initials:string;
    country:string;
    league:string;
    status:Status
}

export class Team extends Entity<TeamProps>{

    get name() {
        return this.props.name
    }

    set name(name:string) {
        this.props.name = name
    }

    get initials() {
        return this.props.initials
    }

    set initials(initials:string) {
        this.props.initials = initials;
    }

    get country() {
        return this.props.country
    }

    set country(country:string) {
        this.props.country = country;
    }

    get league() {
        return this.props.league;
    }

    set league(league:string) {
        this.props.league = league;
    }

    get status(){
        return this.props.status;
    }

    set status(status:Status){
        this.props.status=status;
    }
}