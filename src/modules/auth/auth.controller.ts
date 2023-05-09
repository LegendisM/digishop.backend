import { Controller, Body, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { IResponseResult } from "src/common/interface/response.interface";

@Controller({
    path: 'auth',
    version: '1'
})
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('signup')
    @HttpCode(HttpStatus.OK)
    async signup(
        @Body() authDto: AuthDto
    ): Promise<IResponseResult<{ token: string }>> {
        let { state, token, message } = await this.authService.signup(authDto);
        return {
            state,
            data: { token },
            message
        };
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signin(
        @Body() authDto: AuthDto
    ): Promise<IResponseResult<{ token: string }>> {
        let { state, token, message } = await this.authService.signin(authDto);
        return {
            state,
            data: { token },
            message
        };
    }
}