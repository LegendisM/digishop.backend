import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator((data: string, context: ExecutionContext) => {
    let request = context.switchToHttp().getRequest();
    let user = request.user;
    return data ? user?.[data] : user;
});