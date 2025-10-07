import { User } from "../../domain/Entites/User";
import type { IUserRepository } from "../../domain/repositories/user-repository";
import { EmailInUseError } from "../errors/email-alredy-exists";
import type { IHasher } from "../protocols/criptography/hash";
import type { IcreateUser, IcreateUserRequest, IcreateUserResponse } from "../protocols/usecases/IcreateUser";

export class CreateUser implements IcreateUser {
    
    constructor( private readonly _UserRepository:IUserRepository,
                 private readonly _IHasher: IHasher,
               ) {}
    
    async execute({name,email,password}: IcreateUserRequest): Promise<IcreateUserResponse> {

        const UserAlreadyExists= await this._UserRepository.findByEmail(email);

        if(UserAlreadyExists) throw new EmailInUseError();
        
        const PasswordHash=await this._IHasher.Hash(password);

        const user=await this._UserRepository.create(User.Create({
            name:name,
            password:PasswordHash,
            email:email,
        }));
        return {
            user
        };
        
    }

}