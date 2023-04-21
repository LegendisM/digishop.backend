import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import { FilterQuery, Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { IUser } from "./interface/user.interface";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async create(definition: CreateUserDto): Promise<IUser> {
        return await this.userModel.create(definition);
    }

    async findOne(filter: FilterQuery<User>, projection: IUser | object = {}): Promise<IUser> {
        return await this.userModel.findOne(filter, projection);
    }

    async findById(id: string, projection: IUser | object = {}): Promise<IUser> {
        return await this.userModel.findById(id, projection);
    }

    async find(filter: FilterQuery<User>, projection: IUser | object = {}, option: object = {}): Promise<IUser[]> {
        return await this.userModel.find(filter, projection, option);
    }

    async updateOne(filter: FilterQuery<User>, update: object | IUser): Promise<any> {
        return await this.userModel.updateOne(filter, update);
    }

    async updateMany(filter: FilterQuery<User>, update: object | IUser): Promise<any> {
        return await this.userModel.updateMany(filter, update);
    }
}