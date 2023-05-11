import { IUser } from "src/modules/user/interface/user.interface";

export interface IAuthJwt {
    id: string;
    username: string;
}

export interface IAuthResult {
    state: boolean;
    user?: IUser | null;
    token: string;
    message: string;
}