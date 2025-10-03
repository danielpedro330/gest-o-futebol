export interface IcreateUserRequest{
    name:       string;
    email:      string;
    password:   string;
}
export interface IcreateUserResponse{
    token: string;
}

export interface IcreateUser{
    execute(user:IcreateUserRequest):Promise<IcreateUserResponse>;
}