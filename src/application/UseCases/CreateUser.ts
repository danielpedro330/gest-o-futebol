import { User } from "../../domain/Entites/User";
import type { IUserRepository } from "../../domain/repositories/user-repository";
import type {IEncrypter} from '../protocols/criptography/encrypter';
import type { IHasher } from "../protocols/criptography/hash";
import type { IcreateUser, IcreateUserRequest, IcreateUserResponse } from "../protocols/usecases/IcreateUser";

export class CreateUser implements IcreateUser {
    
    constructor( private readonly _UserRepository:IUserRepository,
                 private readonly _IHasher: IHasher,
                 private readonly encrypter: IEncrypter,
               ) {}
    
    async execute({name,email,password}: IcreateUserRequest): Promise<IcreateUserResponse> {

        const UserAlreadyExists= await this._UserRepository.findByEmail(email);

        if(UserAlreadyExists) throw new Error('User already exists');
        
        const PasswordHash=await this._IHasher.Hash(password);

        const user=User.Create({
            name:name,
            password:PasswordHash,
            email:email,
        }); 

        
        await this._UserRepository.create(user);

        const token = await this.encrypter.encrypt(user.id.toString());
        return {
            token
        };
        
    }

}