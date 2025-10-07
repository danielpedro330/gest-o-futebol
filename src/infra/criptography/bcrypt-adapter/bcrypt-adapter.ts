import { type IHasher } from '../../../application/protocols/criptography/hash'
import { type IHashComparer } from '../../../application/protocols/criptography/hash-compare'
import {hash,compare} from 'bcrypt'

export class BcryptAdapter implements IHasher, IHashComparer {
  private readonly _salt
  constructor (salt: number) {
    this._salt = salt
  }

  async Hash (value: string): Promise<string> {
    return await hash(value, this._salt)
  }

  async Compare (value: string, hashedValue: string): Promise<boolean> {
    return await compare(value, hashedValue)
  }
}