import jwt from 'jsonwebtoken';
import { envs } from './envs';

export class JwtAdapter {

  public static async generateToken (payload: any, duration: string = '1h', jwtSeed: string) {
    return new Promise((resolve) => {
      jwt.sign(payload, jwtSeed, {expiresIn: duration}, (error, token) => {
        if (error) {
          return resolve(null);
        }
        return resolve(token);
      });
    });
  }

  public static validateToken (token: string) {
    return new Promise((resolve) => {
      jwt.verify(token, envs.JWT_SEED, (err, decoded) => {
        if (err) {
          return resolve(null);
        }
        resolve(decoded);
      });
    });
  }
}