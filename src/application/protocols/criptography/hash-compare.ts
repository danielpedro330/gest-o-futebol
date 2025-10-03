export interface IHashComparer {
  Compare (value: string, hashedValue: string): Promise<boolean>
}