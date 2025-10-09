import { CreateUser } from "@/application/UseCases/CreateUser";
import { BcryptAdapter } from "@/infra/criptography/bcrypt-adapter/bcrypt-adapter";
import { CreateUserController } from "@/presentation/controller/user/CreateUserController";
import type { IController } from "@/protocols";
import { SingIn } from "../../../application/UseCases/sing-in";
import { InMemoryUserRepository } from "../../../../test/repositories";
import { JwtAdapter } from "@/infra/criptography/jwt-adapter/jwt-adapter";

export const CreateUserControllerFactory = (): IController => {

    const userRepository=new InMemoryUserRepository();
    //let userRepository=new UserRepository();
    const bcryptAdapterClass=new BcryptAdapter(12);
    const JwtAdapterClass=new JwtAdapter('secret')
    const createUser=new CreateUser(userRepository,bcryptAdapterClass)
    const SingInfactory=new SingIn(userRepository,bcryptAdapterClass,JwtAdapterClass);
    const createUserController=new CreateUserController(createUser,SingInfactory)

    return createUserController;
}