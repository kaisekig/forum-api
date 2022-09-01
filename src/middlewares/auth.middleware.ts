import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "src/services/user.service";
import * as jwt from "jsonwebtoken";
import { JwtDataDto } from "src/dtos/auth/jwt.data.dto";
import { jwtSecret } from "configuration/jwt.secret";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly userService: UserService
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
            return;
        }

        const jwtData: JwtDataDto = jwt.verify(tokenString, jwtSecret);

        if (!jwtData) {
            const currentTimestamp = new Date().getTime() / 1000;

            if (currentTimestamp >= jwtData.exp) {
                throw new HttpException('Token expired', HttpStatus.UNAUTHORIZED);
            }
        }

        //req.token = jwtData;

        /*
        if (jwtData.ip !== req.ip.toString()) {
            console.log("!!!ERROR!!!");
            console.log("JWT: ", jwtData.ip);
            console.log("REQUEST: ", req.ip.toString());
            throw new HttpException("Bad ip", HttpStatus.UNAUTHORIZED);
        }

        if (jwtData.ua !== req.headers["user-agent"]) {
            console.log("!!!ERROR!!!");
            console.log("JWT: ", jwtData.ua);
            console.log("REQUEST: ", req.headers["user-agent"]);
            throw new HttpException("Bad header", HttpStatus.UNAUTHORIZED);
        }
        */

        if (!jwtData.role) {
            throw new HttpException('No role', HttpStatus.UNAUTHORIZED);
        }

        if (jwtData.role === "allowed") {
            const user = await this.userService.getById(jwtData.id);
            if (!user) {
                throw new HttpException('Account not found', HttpStatus.UNAUTHORIZED);
            }
        } 
        /*
            else {
                throw new HttpException('Unknown role', HttpStatus.UNAUTHORIZED);
            }
        */

        const currentTimestamp = new Date().getTime() / 1000;
        if (currentTimestamp >= jwtData.exp) {
            throw new HttpException("Token has expired", HttpStatus.UNAUTHORIZED);
        }

        req.token = jwtData;

        next();
    }
}