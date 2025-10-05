import { CreateUser } from "@/application/UseCases/CreateUser";
import { BcryptAdapter } from "@/infra/criptography/bcrypt-adapter/bcrypt-adapter";
import { CreateUserController } from "@/presentation/controller/user/CreateUserController";
import type { IController } from "@/protocols";
import { InMemoryUserRepository } from "../../../../test/repositories";

export const CreateUserControllerFactory = (): IController => {

    const userRepository=new InMemoryUserRepository();
    //let userRepository=new UserRepository();
    const bcryptAdapterClass=new BcryptAdapter(12);
    const createUser=new CreateUser(userRepository,bcryptAdapterClass)
    const createUserController=new CreateUserController(createUser)

    return createUserController;
}