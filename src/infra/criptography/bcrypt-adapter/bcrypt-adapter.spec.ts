import { vi } from 'vitest';
import { BcryptAdapter } from './bcrypt-adapter'
import * as bcrypt from 'bcrypt'

vi.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => { resolve('hash') })
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async compare (value: string, hashedValue: string): Promise<boolean> {
    return await new Promise(resolve => { resolve(true) })
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  const sut = new BcryptAdapter(salt)
  return sut
}
describe('Bcrypt Adapter', () => {
  test('should call bcrypt adapter with correct values', async () => {
    const sut = makeSut()
  const hashSpy = vi.spyOn(bcrypt, 'hash')
    await sut.Hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('should return hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.Hash('any_value')
    expect(hash).toEqual('hash')
  })

  test('should throws if bcrypt throws', async () => {
    const sut = makeSut()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vi.spyOn<any, string>(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const promise = sut.Hash('any_value')
    await expect(promise).rejects.toThrow()
  })

  test('should call bcrypt adapter compare with correct values', async () => {
    const sut = makeSut()
  const compareSpy = vi.spyOn(bcrypt, 'compare')
    await sut.Compare('any_value', 'hashedValue')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'hashedValue')
  })

  test('should return true when compare succeeds', async () => {
    const sut = makeSut()
    const compare = sut.Compare('any_value', 'hashedValue')
    expect(compare).toBeTruthy()
  })

  test('should return false when compare fails', async () => {
    const sut = makeSut()
  vi.spyOn(bcrypt, 'compare').mockImplementationOnce(() => { return false })
    const IsValid = await sut.Compare('any_value', 'hashedValue')
    expect(IsValid).toBe(false)
  })

  test('should throws if bcrypt compare throws', async () => {
    const sut = makeSut()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vi.spyOn<any, string>(bcrypt, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const promise = sut.Compare('any_value', 'hashedValue')
    await expect(promise).rejects.toThrow()
  })
})