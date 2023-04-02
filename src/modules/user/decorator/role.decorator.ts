import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "../interface/role.interface";
import { RolesGuard } from "../guard/roles.guard";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => {
    return applyDecorators(
        SetMetadata(ROLES_KEY, roles),
        UseGuards(RolesGuard)
    )
};