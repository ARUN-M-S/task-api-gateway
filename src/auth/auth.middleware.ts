import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { TokenService } from "src/utilities/token.service";
// Adjust the path as needed

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    console.log(authHeader, "authheader");

    if (!authHeader) {
      throw new HttpException(
        "Authorization header is missing",
        HttpStatus.UNAUTHORIZED
      );
    }

    const token = authHeader; // Assuming format is "Bearer token"
    console.log(token, "tokennn");

    if (!token) {
      throw new HttpException("Token is missing", HttpStatus.UNAUTHORIZED);
    }

    try {
      const decoded = this.tokenService.verifyToken(token);
      console.log(decoded, "decoded");

      req.user = decoded; // Attach decoded user information to the request object
      next();
    } catch (error) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
  }
}
