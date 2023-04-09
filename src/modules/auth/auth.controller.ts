import { Controller, Body, Post, UnauthorizedException, ConflictException, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signup.dto";
import { SignInDto } from "./dto/signin.dto";

@Controller({
    path: 'auth',
    version: '1'
})
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() dto: SignUpDto) {
        let { state, token, message } = await this.authService.signup(dto);
        if (!state) {
            return new ConflictException({ message });
        }
        return { state, token, message };
    }

    @Post('signin')
    @HttpCode(HttpStatus.ACCEPTED)
    async signin(@Body() dto: SignInDto) {
        let { state, token, message } = await this.authService.signin(dto);
        if (!state) {
            return new UnauthorizedException({ message });
        }
        return { state, token, message };
    }

}