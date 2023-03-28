import { applyDecorators, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./auth.guard";

export const Auth = () => {
    return applyDecorators(
        UseGuards(JwtAuthGuard),
    )
}