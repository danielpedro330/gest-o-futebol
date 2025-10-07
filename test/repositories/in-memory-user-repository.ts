import type { User } from "@/domain/Entites/User"
import type { IUserRepository } from "@/domain/repositories/user-repository"
import type { PaginationParams } from "@/utils/pagination-params"

export class InMemoryUserRepository implements IUserRepository{
  

    public item:User[]=[]

    async create(user: User) 
    {
        this.item.push(user)
        return user
    }

    async fetchMany(param: PaginationParams)
    {
        return this.item.filter(item=>item.name.includes(param.search ? param.search: ''))
        .slice((param.page-1)*20,param.page*20)
    }

    async findByUserName(UserName: string)
    {
        return this.item.find(item=>item.name==UserName)
    }

      async findByEmail(Email: string) {
        return this.item.find(item=>item.email==Email)
    }


    async findById(Id: string) 
    {
        return this.item.find(item=>item.id.toString()==Id)
    }

    async findAll() 
    {
        return this.item
    }

    async save(user: User)
    {
        const IndexId=this.item.findIndex((item) => item.id===user.id);
        this.item[IndexId] = user;
    }

    async delete(user: User): Promise<void> 
    {
        const IndexId=this.item.findIndex((item) => item.id===user.id);
        this.item.splice(IndexId,1);
    }
    
}