import type { IUserRepository } from "@/domain/repositories/user-repository";
import type { ISingIn, SingInRequest, SingInResponse } from "../protocols/usecases/Ising-in";
import type { IHashComparer } from "../protocols/criptography/hash-compare";
import type { IEncrypter } from "../protocols/criptography/encrypter";
import { ResourceNotFound } from "../errors/resource-not-found";

export class SingIn  implements ISingIn{
    constructor(private readonly _UserRepository:IUserRepository,
            private readonly _HashComparer:IHashComparer,
            private readonly _Encrypter:IEncrypter
    ){}
    
    async execute({identyti,password}: SingInRequest): Promise<SingInResponse> {
        
        const UserExists=await this._UserRepository.findByUserNameOrEmail(identyti)
        
        if(!UserExists) throw new ResourceNotFound();
        
            const IsvalidPassword=await this._HashComparer.Compare(password,UserExists.password)
       
        if(!IsvalidPassword) throw new ResourceNotFound();
        
            const token=await this._Encrypter.encrypt(UserExists.id.toString())
       
        return {
            token
        }
    }

}