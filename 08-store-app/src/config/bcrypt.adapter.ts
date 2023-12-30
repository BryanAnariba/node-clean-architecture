import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export class Bcrypt {
  
  public static hash (password: string) {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }

  public static compare(password: string, hashedPassword: string) {
    return compareSync(password, hashedPassword);
  }
}