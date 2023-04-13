import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "../interface/role.interface";
import { RolesGuard } from "../guard/roles.guard";
import { Auth } from "src/modules/auth/decorator/auth.decorator";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => {
    return applyDecorators(
        SetMetadata(ROLES_KEY, roles),
        Auth(),
        UseGuards(RolesGuard)
    )
};