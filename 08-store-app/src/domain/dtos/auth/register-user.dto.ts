import { regularExps } from "../../../config";

export class RegisterUserDto {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}

  public static create(object: {[key: string]: any}): [string?, RegisterUserDto?] {
    const {name, email, password} = object;
    if (!name || name.length === 0) {
      return ['Name is required'];
    }

    if (!email || email.length === 0) {
      return ['Email is required'];
    }

    if (!regularExps.email.test(email)) {
      return ['Invalid Email'];
    }

    if (!password) {
      return ['Password is required'];
    }

    if (password.length < 6) {
      return ['Password is too short'];
    }

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}