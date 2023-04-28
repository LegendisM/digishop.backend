import { Controller, Body, Post, UnauthorizedException, ConflictException, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

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
    async signup(@Body() authDto: AuthDto) {
        let { state, token, message } = await this.authService.signup(authDto);
        if (!state) {
            throw new ConflictException({ message });
        }
        return { state, token, message };
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signin(@Body() authDto: AuthDto) {
        let { state, token, message } = await this.authService.signin(authDto);
        if (!state) {
            throw new UnauthorizedException({ message });
        }
        return { state, token, message };
    }
}