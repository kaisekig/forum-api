import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { User } from "src/entities/user";
import { CreateUserDto } from "src/dtos/user/create.user.dto";
import { UpdateUserDto } from "src/dtos/user/update.user.dto";
import { AllowToRoles } from "src/misc/allow.to.roles";
import { ApiResponse } from "src/misc/api.response";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";
import { UserService } from "src/services/user.service";

@Controller("api/user")
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles("allowed")
    getAll(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Get(":id")
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles("allowed")
    getById(@Param("id") id: number): Promise<User | ApiResponse> {
        return new Promise(async(resolve) => {
            let user = await this.userService.getById(id);

            if (user === undefined) {
                resolve(new ApiResponse("error", -1002, "User doesn't exist!"))
            }

            resolve(user);
        });
    }

    @Post("create")
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles("forbiden")
    create(@Body() data: CreateUserDto): Promise<User | ApiResponse> {
        return this.userService.add(data);
    }

    @Put(":id")
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles("allowed")
    update(@Param("id") id: number, @Body() data: UpdateUserDto): Promise<User | ApiResponse> {
        return this.userService.edit(id, data);
    }
}