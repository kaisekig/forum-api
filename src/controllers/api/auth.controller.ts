import { Body, Controller, Post, Req } from "@nestjs/common";
import { SigninUserDto } from "src/dtos/user/signin.dto";
import { ApiResponse } from "src/misc/api.response";
import { UserService } from "src/services/user.service";
import * as crypto from 'crypto';
import { SigninInfoDto } from "src/dtos/auth/signin.info.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataDto } from "src/dtos/auth/jwt.data.dto";
import { Request } from "express";
import { jwtSecret } from "configuration/jwt.secret";
import { RegistrationDto } from "src/dtos/user/registration.dto";
import { User } from "src/entities/user";

@Controller("auth")
export class AuthController {
    constructor(
        public userService: UserService
    ) {}
    
    @Post('signin')
    async signIn(@Body() data: SigninUserDto, @Req() req: Request): Promise<SigninInfoDto | ApiResponse> {
        const user = await this.userService.getByUsername(data.username);

        if (!user) {
            return new Promise(resolve =>
                resolve(new ApiResponse("error", -3001)))
        }

        const passwordHash = crypto.createHash("sha512");
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest("hex").toUpperCase();

        if (user.passwordHash !== passwordHashString) {
            return new Promise(resolve =>
                resolve(new ApiResponse("error", -3002)))
        }

        const jwtData = new JwtDataDto();
        jwtData.role = "allowed";
        jwtData.id = user.userId;
        jwtData.identity = user.username;

        let now = new Date();
        now.setDate(now.getDate() + 30);
        const expTimestamp = now.getTime() / 1000; // seconds
        jwtData.exp = expTimestamp;

        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"];

        let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecret);

        const responseObject = new SigninInfoDto(
            user.userId,
            user.username,
            token
        );

        return new Promise(resolve => resolve(responseObject));
    }

    @Post("register")
    async register(@Body() data: RegistrationDto): Promise<User | ApiResponse> {
        return await this.userService.signup(data);
    }

    
}