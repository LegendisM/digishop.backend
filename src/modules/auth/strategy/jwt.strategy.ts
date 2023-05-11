import _ from "lodash";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../../user/user.service";
import { IAuthJwt } from "../interface/auth.interface";
import { IUser } from "src/modules/user/interface/user.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private configService: ConfigService,
        private userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: IAuthJwt): Promise<IUser> {
        let user = await this.userService.getUserById(payload.id);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}