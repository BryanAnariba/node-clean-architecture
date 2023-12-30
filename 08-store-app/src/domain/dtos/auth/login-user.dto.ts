import { regularExps } from "../../../config";

export class LoginUserDto {
  constructor (
    public readonly email: string,
    public readonly password: string
  ) {}

  public static create(object: {[key: string]: any}): [string?, LoginUserDto?] {
    const {email, password} = object;
    if (!email || email.length === 0) {
      return ['Email is required'];
    }

    if (!regularExps.email.test(email)) {
      return ['Invalid email'];
    }

    if (!password) {
      return ['Invalid Password']
    }

    return [undefined, new LoginUserDto(email, password)];
  }
}