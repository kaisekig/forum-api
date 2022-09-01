import { SetMetadata } from "@nestjs/common"

export const AllowToRoles = (...roles: ("allowed" | "forbiden")[]) => {
    return SetMetadata("allow_to_roles", roles);
} 