import  { Status } from "../enum/status";
import type { Optional } from "../types/optional";
import { Entity } from "./Entity";
import type { UniqueEntityID } from "./unique-entity-id";


export interface UserProps{
    name:           string;
    email:          string;
    password:       string;
    createdAt:      Date;
    updatedAt?:     Date;
    status:         Status;
}


export class User extends Entity<UserProps>{

    get name(){
        return this.props.name;
    }

    set name(name:string){
        this.props.name=name;
        this.touch();
    }

      get email(){
        return this.props.email;
    }

    set email(email:string){
        this.props.email=email;
        this.touch();
    }
    
    get password(){
        return this.props.password;
    }

    set password(password:string){
        this.props.password=password;
        this.touch();
    }

      get status(){
        return this.props.status;
    }

    set status(status:Status){
        this.props.status=status;
        this.touch();
    }

    get createdAt(){
		return this.props.createdAt;
	}

    get updatedAt(){
		return this.props.updatedAt;
	}

     private touch(){
        this.props.updatedAt= new Date();
    }


    static Create(props:Optional<UserProps,'createdAt'|'status'>, id?:UniqueEntityID){
        const user=new User({
            ...props,
             createdAt:props.createdAt ?? new Date(),
             status:props.status ?? Status.Active
        },id);

        return user;
    }

}