import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "src/services/user.service";
import * as jwt from "jsonwebtoken";
import { JwtDataDto } from "src/dtos/auth/jwt.data.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {}
    async use(req: Request, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            throw new HttpException("Token not found", HttpStatus.UNAUTHORIZED);
        }

        const token = req.headers.authorization;
        const tokenParts = token.split(" ");
        if (tokenParts.length !== 2) {
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED);
        }

        const tokenString = tokenParts[1];

        if (("" + tokenString).length < 5) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        const jwtData: JwtDataDto = jwt.verify(tokenString, this.configService.get('JWT_SECRET'));

        if (!jwtData) {
            const currentTimestamp = new Date().getTime() / 1000;

            if (currentTimestamp >= jwtData.exp) {
                throw new HttpException('Token expired', HttpStatus.UNAUTHORIZED);
            }
        }

        if (!jwtData.role) {
            throw new HttpException('No role', HttpStatus.UNAUTHORIZED);
        }

        if (jwtData.role === "allowed") {
            const user = await this.userService.getById(jwtData.id);
            if (!user) {
                throw new HttpException('Account not found', HttpStatus.UNAUTHORIZED);
            }
        } 

        const currentTimestamp = new Date().getTime() / 1000;
        if (currentTimestamp >= jwtData.exp) {
            throw new HttpException("Token has expired", HttpStatus.UNAUTHORIZED);
        }

        req.token = jwtData;

        next();
    }
}