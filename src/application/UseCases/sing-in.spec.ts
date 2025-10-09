import { vi } from "vitest";
import { makeUsers } from "../../../test/factories/make-user";
import { InMemoryUserRepository } from "../../../test/repositories/in-memory-user-repository";
import { IUserRepository } from "../../domain/repositories/user-repository";
import { IEncrypter } from "../protocols/criptography/encrypter";
import { IHashComparer } from "../protocols/criptography/hash-compare";
import type { ISingIn} from "../protocols/usecases/Ising-in";
import {SingIn} from './sing-in'
import { UniqueEntityID } from "../../domain/Entites/unique-entity-id";


interface SutTypes{
    sut:ISingIn,
    UserRepositoryStub: IUserRepository,
    EncrypterStub: IEncrypter,
    HashComparerStub:IHashComparer
}

const makeIEncrypterStub = (): IEncrypter => {
  class Encrypter implements IEncrypter {
    async encrypt (): Promise<string> {
      return await new Promise(resolve => { resolve('Any_Token') })
    }
  }

  return new Encrypter()
}

const makeIHashCompare=():IHashComparer=>{
    class HashComparer implements IHashComparer{
        async Compare(value: string, hashedValue: string): Promise<boolean> {
            return new Promise(resolve=>{resolve(true)})
        }
        
    }
    return new HashComparer()
}

function makeSut(): SutTypes{
    const UserRepositoryStub=new InMemoryUserRepository();
    const EncrypterStub=makeIEncrypterStub();
    const HashComparerStub=makeIHashCompare();
    const sut= new SingIn(UserRepositoryStub,HashComparerStub,EncrypterStub);

    return {
        sut,
        UserRepositoryStub,
        EncrypterStub,
        HashComparerStub
    }
}


describe('SingIn',()=>{
    
    test('shold be able sing-in user and return token',async()=>{
       
        const {sut,UserRepositoryStub}=makeSut();
       
       await  UserRepositoryStub.create(makeUsers({
                    name:'any_name', 
                    email:'any_Email',
                    password:'any_password'
                }));
       
        const {token}= await sut.execute({
            identyti:'any_Email',
            password:'any_password'
       })

       expect(token).toBe('Any_Token')
    })

        test('should call Encrypter with correct Id',async()=>{
        
            const {sut,EncrypterStub,UserRepositoryStub}=makeSut();
        
        const EncrypterStubSpy=vi.spyOn(EncrypterStub,'encrypt')

            await  UserRepositoryStub.create(makeUsers({
                    name:'any_name', 
                    email:'any_Email',
                    password:'any_password'
                },new UniqueEntityID('any_Id')));

        await sut.execute({
        identyti:'any_name',
        password:'any_password'
       })
       expect(EncrypterStubSpy).toHaveBeenCalledWith('any_Id')
    })
     
})


