import bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { LanguageService } from "../language/language.service";
import { AuthDto, AuthResultDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private languageService: LanguageService
    ) { }

    async signup(authDto: AuthDto): Promise<AuthResultDto> {
        let token = '', message = '', state = false;
        let user = await this.userService.getUser({ username: authDto.username });

        if (!user) {
            user = await this.userService.createUser({
                username: authDto.username,
                password: bcrypt.hashSync(authDto.password, 6)
            });
            token = this.jwtService.sign({ id: user.id, username: user.username });
            message = 'signup_success';
            state = true;
        } else {
            message = 'already_username_used';
        }

        return { state, user, token, message: this.languageService.get(message) };
    }

    async signin(authDto: AuthDto): Promise<AuthResultDto> {
        let token = '', message = '', state = false;
        let user = await this.userService.getUser({ username: authDto.username });

        if (user && bcrypt.compareSync(authDto.password, user.password)) {
            token = this.jwtService.sign({ id: user.id, username: user.username });
            message = 'signin_success';
            state = true;
        } else {
            message = 'invalid_information';
        }

        return { state, user, token, message: this.languageService.get(message) };
    }
}