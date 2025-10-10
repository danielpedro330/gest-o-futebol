import { Status } from '../enum/status';
import { Entity } from './Entity';
import type { Optional } from '../types/optional';
import { UniqueEntityID} from './unique-entity-id'

export interface TeamProps{
    name:string;
    logo: string;
    email: string;
    password: string;
    rank: string;
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

    get logo() {
        return this.props.logo
    }

    set logo(logo:string) {
        this.props.logo = logo
    }

    get email() {
        return this.props.email
    }

    set email(email:string) {
        this.props.email = email
    }

    get password() {
        return this.props.password
    }

    set password(password:string) {
        this.props.password = password
    }

    get rank() {
        return this.props.rank
    }

    set rank(rank:string) {
        this.props.rank = rank
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

    static Create(props: Optional<TeamProps, 'status'>, id?: UniqueEntityID
    ) {
        const team = new Team({
            ...props,
            status: Status.Active,
        }, id);

        return team;
    }
}