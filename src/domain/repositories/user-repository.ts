import type { PaginationParams } from "../../utils/pagination-params"
import type { User } from "../Entites/User"

export interface IUserRepository{
    create(user:User):Promise<void>
    fetchMany( param:PaginationParams):Promise<User[]>
    findByUserName(UserName:string):Promise<User | undefined>
    findByEmail(Email:string):Promise<User | undefined>
    findById(Id:string):Promise<User | undefined>
    findAll():Promise<User[]>
    save(user:User):Promise<void>
    delete(user: User):Promise<void>
   
}