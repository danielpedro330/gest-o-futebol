import { vi } from 'vitest';
import type { IcreateUser } from "../protocols/usecases/IcreateUser";
import type { IUserRepository } from "../../domain/repositories/user-repository";
import type { IHasher } from "../protocols/criptography/hash";
import { InMemoryUserRepository } from "../../../test/repositories/in-memory-user-repository";
import { CreateUser } from "./CreateUser";
import { makeUsers } from "../../../test/factories/make-user";
import { EmailInUseError } from '../errors/email-alredy-exists';

interface SutTypes{
    sut: IcreateUser,
    UserRepositoryStub: IUserRepository,
    HasherStub: IHasher
}

const makeHasherStub = (): IHasher => {
  class HashStub implements IHasher {
    async Hash (): Promise<string> {
      return await new Promise(resolve => { resolve('hashed_password') })
    }
  }

  return new HashStub()
}

/*const makeIEncrypterStub = (): IEncrypter => {
  class Encrypter implements IEncrypter {
    async encrypt (): Promise<string> {
      return await new Promise(resolve => { resolve('Any_Token') })
    }
  }

  return new Encrypter()
}*/



function makeSut(): SutTypes{
    const UserRepositoryStub=new InMemoryUserRepository();
    const HasherStub=makeHasherStub();
    //const EncrypterStub=makeIEncrypterStub();
    const sut=  new CreateUser(UserRepositoryStub,HasherStub);

    return {
        sut,
        UserRepositoryStub,
        HasherStub
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

        await expect(promise).rejects.toThrow(new EmailInUseError())
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
    });

    it('should be able create a new user',async ()=>{
       const {sut}=makeSut()
      const user=makeUsers({
        name:'any_name',
        email:'any_email'
      });
      const result=await sut.execute({
        email:user.email,
        name:user.name,
        password:user.password
      })
      expect(result.user.email).toBe('any_email')
    })

})