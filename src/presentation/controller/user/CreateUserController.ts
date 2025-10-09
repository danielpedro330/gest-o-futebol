import type { IcreateUser } from "@/application/protocols/usecases/IcreateUser";
import type { ISingIn } from "@/application/protocols/usecases/Ising-in";
import { InvalidParamError } from "@/presentation/errors/invalid-params";
import { BadRequest, Ok, serverError } from "@/presentation/helpers/http-helpers";
import { userValidator } from "@/presentation/validators/user-validator";
import type { HttpRequest, HttpResponse, IController } from "@/protocols";

export class CreateUserController implements IController{
    
    constructor(private readonly _IcreateUser:IcreateUser,
        private readonly _SingIn:ISingIn
    ){}
    
   async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        
            const {name,email,password}=httpRequest.body;

            const validator=new userValidator();
            
            const Isvalid=validator.validate({name,email,password})
           
            if(!Isvalid) return BadRequest(new InvalidParamError(validator.getErrors({name,email,password}).join(', ')));
    
           try {
                 await this._IcreateUser.execute({ name, email, password });
                 
                 const token=await this._SingIn.execute({
                    identyti:email,
                    password
                 });

                return Ok(token);

            } catch (error: unknown) {
                if (error instanceof Error && error.name === 'EmailInUseError') {
                    return BadRequest(error);
                }
                return serverError(error as Error);
            }

   }
}