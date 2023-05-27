import { Controller, Body, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { IResponseResult } from "src/common/interface/response.interface";
import { ApiTags } from "@nestjs/swagger";
import { I18n, I18nContext } from "nestjs-i18n";

@ApiTags('auth')
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
        @Body() authDto: AuthDto,
        @I18n() i18n: I18nContext
    ): Promise<IResponseResult<{ token: string }>> {
        let { state, token, message } = await this.authService.signup(authDto);
        return {
            state,
            data: { token },
            message: i18n.t(`auth.${message}`)
        };
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signin(
        @Body() authDto: AuthDto,
        @I18n() i18n: I18nContext
    ): Promise<IResponseResult<{ token: string }>> {
        let { state, token, message } = await this.authService.signin(authDto);
        return {
            state,
            data: { token },
            message: i18n.t(`auth.${message}`)
        };
    }
}