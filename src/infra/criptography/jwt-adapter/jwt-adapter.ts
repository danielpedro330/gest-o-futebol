import type { IEncrypter } from '@/application/protocols/criptography/encrypter'
import {sign} from 'jsonwebtoken'

export class JwtAdapter implements IEncrypter {
  private readonly _secret: string
  constructor (secret: string) {
    this._secret = secret
  }

  async encrypt (value: string): Promise<string> {
    const token = sign({ Id: value }, this._secret)
    return token
  }
}