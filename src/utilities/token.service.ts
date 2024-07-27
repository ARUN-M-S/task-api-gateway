import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  private readonly secretKey = 'ypurdRGDuxwk5Xkre50qTg==';
  private readonly expiresIn = '1h'; // Token expiration time

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
