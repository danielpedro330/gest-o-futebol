import { type FastifyRequest as Request, type FastifyReply as Response} from 'fastify'
import { type HttpRequest, type IController } from '../../protocols'
export const adapterRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params:req.query,
      req:req
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      return res.status(httpResponse.statusCode).send(httpResponse.body)
    } else {
      return res.status(httpResponse.statusCode).send({
        error: httpResponse.body.message
      })
    }
  }
}