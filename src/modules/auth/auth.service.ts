import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { SignUpDto, SignUpResultDto } from "./dto/signup.dto";
import { SignInDto, SignInResultDto } from "./dto/signin.dto";
import bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { LanguageService } from "../language/language.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private languageService: LanguageService
    ) { }

    async signup(dto: SignUpDto): Promise<SignUpResultDto> {
        let token = '', message = '', status = false;
        let user = await this.userService.findOne({ username: dto.username });

        if (!user) {
            user = await this.userService.create({
                username: dto.username,
                password: bcrypt.hashSync(dto.password, 6)
            });
            token = this.jwtService.sign({ id: user.id, username: user.username, language: user.language });
            message = 'signup_success';
            status = true;
        } else {
            message = 'already_username_used';
        }

        return { status, user, token, message: this.languageService.get(message) };
    }

    async signin(dto: SignInDto): Promise<SignInResultDto> {
        let token = '', message = '', status = false;
        let user = await this.userService.findOne({ username: dto.username });

        if (user && bcrypt.compareSync(dto.password, user.password)) {
            token = this.jwtService.sign({ id: user.id, username: user.username, language: user.language });
            message = 'signin_success';
            status = true;
        } else {
            message = 'invalid_information';
        }

        return { status, user, token, message: this.languageService.get(message) };
    }

}