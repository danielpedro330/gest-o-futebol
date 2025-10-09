export interface SingInRequest{
    identyti:string,
    password:string
}

export interface SingInResponse{
    token:string
}

export  interface ISingIn{
    execute(LoginData:SingInRequest):Promise<SingInResponse>
}