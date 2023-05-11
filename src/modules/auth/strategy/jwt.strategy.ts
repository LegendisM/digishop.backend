import _ from "lodash";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../../user/user.service";
import { IAuthJwt } from "../interface/auth.interface";

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

    async validate(payload: IAuthJwt) {
        return _.pick(
            await this.userService.getUserById(
                payload.id,
                { _id: 1, id: 1, username: 1, language: 1, roles: 1 }
            ),
            ['_id', 'id', 'username', 'language', 'roles']
        );
    }
}