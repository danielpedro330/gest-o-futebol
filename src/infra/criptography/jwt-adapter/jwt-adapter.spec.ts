import { vi } from 'vitest';
import * as jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'


vi.mock('jsonwebtoken', () => ({
  sign: vi.fn(() => Promise.resolve('any_token')),
  verify: vi.fn(),
}));

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}
describe('jwt adapter', () => {
  test('should call jwt with correct values', () => {
    const sut = makeSut()
  const signSpy = vi.spyOn(jwt, 'sign')
    sut.encrypt('any_Id')
    expect(signSpy).toHaveBeenCalledWith({ Id: 'any_Id' }, 'secret')
  })

  test('should return token on sign success', async () => {
    const sut = makeSut()
    const token = await sut.encrypt('any_Id')
    expect(token).toBe('any_token')
  })

  test('should throw if sign throw', async () => {
    const sut = makeSut()
  vi.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.encrypt('any_Id')
    await expect(promise).rejects.toThrow()
  })
})