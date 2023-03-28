import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
    let request = ctx.switchToHttp().getRequest();
    let user = request.user;
    return data ? user?.[data] : user;
});