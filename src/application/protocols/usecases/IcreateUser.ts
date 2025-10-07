import { User } from "@/domain/Entites/User";

export interface IcreateUserRequest{
    name:       string;
    email:      string;
    password:   string;
}
export interface IcreateUserResponse{
    user:User
}

export interface IcreateUser{
    execute(user:IcreateUserRequest):Promise<IcreateUserResponse>;
}