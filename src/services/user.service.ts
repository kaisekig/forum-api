import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/entities/user";
import { CreateUserDto } from "src/dtos/user/create.user.dto";
import { UpdateUserDto } from "src/dtos/user/update.user.dto";
import * as crypto from 'crypto';
import { ApiResponse } from "src/misc/api.response";
import { RegistrationDto } from "src/dtos/user/registration.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly user: Repository<User>

    ) {}
    
    getAll(): Promise<User[]> {
        return this.user.find();
    }

    getById(id: number): Promise<User> {
        return this.user.findOne(id);
    }

    async getByUsername(username: string): Promise<User | null> {
        const user = await this.user.findOne({
            username: username
        });

        if (user) {
            return user
        }

        return null;
    }

    add(data: CreateUserDto): Promise<User | ApiResponse> {
        const passwordHash = crypto.createHash("sha512");
        passwordHash.update(data.password);

        const passwordHashString = passwordHash.digest("hex").toUpperCase();

        let newUser: User    = new User();
        newUser.username     = data.username;
        newUser.email        = data.email;
        newUser.passwordHash = passwordHashString;

        return new Promise((resolve) => {
            this.user.save(newUser)
            .then(data => resolve(data))
            .catch(error => {
                const response: ApiResponse = new ApiResponse("error", -1001, "User already exist!");
                resolve(response);
            })
        }); 
    }

    async edit(id: number, data: UpdateUserDto): Promise<User | ApiResponse> {
        let user: User = await this.user.findOne(id);

        if (user === undefined) {
            return new Promise((resolve) => {
                resolve(new ApiResponse("error", -1002, "User doesn't exist!"))
            })
        }
         
        const passwordHash = crypto.createHash("sha512");
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest("hex").toUpperCase();

        user.passwordHash = passwordHashString;

        return this.user.save(user);
    }

    async signup(data: RegistrationDto): Promise<User | ApiResponse> {
        const passwordHash = crypto.createHash("sha512");
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest("hex").toUpperCase();

        const newUser: User = new User();
        newUser.username     = data.username;
        newUser.email        = data.email;
        newUser.passwordHash = passwordHashString;

        try {
            const savedUser = await this.user.save(newUser);

            if (!savedUser) {
                throw new Error("");
            }

            return savedUser;
            
        } catch(e) {
            return new ApiResponse("error", -6001, "Can not create user account")
        }
    }
}