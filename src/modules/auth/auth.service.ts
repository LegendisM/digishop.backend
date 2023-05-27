import bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./dto/auth.dto";
import { IAuthJwt, IAuthResult } from "./interface/auth.interface";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    generateToken(data: IAuthJwt): string {
        return this.jwtService.sign(data);
    }

    async signup(authDto: AuthDto): Promise<IAuthResult> {
        let token = '', message = '', state = false;
        let user = await this.userService.getOneUser({ username: authDto.username });

        if (!user) {
            user = await this.userService.createUser({
                username: authDto.username,
                password: bcrypt.hashSync(authDto.password, 6)
            });
            token = this.generateToken({ id: user.id, username: user.username });
            message = 'signup_success';
            state = true;
        } else {
            message = 'already_username_used';
        }

        return { state, user, token, message };
    }

    async signin(authDto: AuthDto): Promise<IAuthResult> {
        let token = '', message = '', state = false;
        let user = await this.userService.getOneUser({ username: authDto.username });

        if (user && bcrypt.compareSync(authDto.password, user.password)) {
            token = this.generateToken({ id: user.id, username: user.username });
            message = 'signin_success';
            state = true;
        } else {
            message = 'invalid_information';
        }

        return { state, user, token, message };
    }
}