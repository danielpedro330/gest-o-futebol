import { vi } from 'vitest';
import type { IcreateUser } from "../protocols/usecases/IcreateUser";
import type { IUserRepository } from "@/domain/repositories/user-repository";
import type { IHasher } from "../protocols/criptography/hash";
import { InMemoryUserRepository } from "../../../test/repositories/in-memory-user-repository";
import type { IEncrypter } from "../protocols/criptography/encrypter";
import { CreateUser } from "./CreateUser";
import { UniqueEntityID } from "@/domain/Entites/unique-entity-id";
import { makeUsers } from "../../../test/factories/make-user";

interface SutTypes{
    sut: IcreateUser,
    UserRepositoryStub: IUserRepository,
    HasherStub: IHasher,
    EncrypterStub: IEncrypter,
}

const makeHasherStub = (): IHasher => {
  class HashStub implements IHasher {
    async Hash (): Promise<string> {
      return await new Promise(resolve => { resolve('hashed_password') })
    }
  }

  return new HashStub()
}

const makeIEncrypterStub = (): IEncrypter => {
  class Encrypter implements IEncrypter {
    async encrypt (): Promise<string> {
      return await new Promise(resolve => { resolve('Any_Token') })
    }
  }

  return new Encrypter()
}



function makeSut(): SutTypes{
    const UserRepositoryStub=new InMemoryUserRepository();
    const HasherStub=makeHasherStub();
    const EncrypterStub=makeIEncrypterStub();
    const sut=  new CreateUser(UserRepositoryStub,HasherStub,EncrypterStub);

    return {
        sut,
        UserRepositoryStub,
        HasherStub,
        EncrypterStub
    }
}

describe('Create User Use Case',()=>{

    it('should throw if user already exists', async()=>{
       
        const {sut}=makeSut()

        const user=makeUsers({
            name:'any_name', 
            email:'any_Email',
            password:'any_password'
        });

        await sut.execute({
           name: user.name,
           email:user.email,
           password:user.password
        });

        const promise = sut.execute({
            name: user.name,
            email:user.email,
            password:user.password
        });

        await expect(promise).rejects.toThrow(new Error('User already exists'))
    })

    it('should call Hasher with correct password', async()=>{
       
        const {sut,HasherStub}=makeSut()
        
        const hashSpy=vi.spyOn(HasherStub,'Hash')
        
        const user=makeUsers({password:'any_password'});

        await sut.execute({
            name: user.name,
            email:user.email,
            password:user.password
        });

        expect(hashSpy).toHaveBeenCalledWith('any_password')
    })

    it.skip('should call Encrypter with correct id', async()=>{
       
        const {sut,EncrypterStub}=makeSut()
        
        const encrypterSpy=vi.spyOn(EncrypterStub,'encrypt')
        
        const user=makeUsers({},new UniqueEntityID('any_id'));
        
        await sut.execute({
            name:user.name,
            email:user.email,
            password:user.password
        });

        expect(encrypterSpy).toHaveBeenCalledWith('any_id')
    })

     it('should return any token when user is created', async()=>{
       
        const {sut,EncrypterStub}=makeSut()
        
       vi.spyOn(EncrypterStub,'encrypt').mockResolvedValueOnce('any_token')
        
        const user=makeUsers();

        const result=await sut.execute({
            name:user.name,
            email:user.email,
            password:user.password
        });

      expect(result.token).toBe('any_token')
    })
})