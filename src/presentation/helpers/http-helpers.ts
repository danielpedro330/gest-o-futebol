import { type HttpResponse } from '../../protocols/'
import { ServerError, UnauthorizedError } from '../errors'

export const BadRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const Forbidden = (error: Error): HttpResponse => {
  return {
    statusCode: 4003,
    body: error
  }
}

export const unauthorized = (): HttpResponse => {
  return {
    statusCode: 401,
    body: new UnauthorizedError()
  }
}

export const serverError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.message)
  }
}

export const Ok = (data: unknown): HttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}