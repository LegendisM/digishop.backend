import { IUser } from "src/modules/user/interface/user.interface";

export interface IAuthResult {
    state: boolean;
    user: IUser | null;
    token: string;
    message: string;
}