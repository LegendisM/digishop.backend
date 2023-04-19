import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument, UserModel } from "./user.model";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserModel>
    ) { }

    async create(definition: CreateUserDto): Promise<UserDocument> {
        return await this.userModel.create(definition);
    }

    async findOne(filter: object | UserModel, projection: UserModel | object = {}): Promise<UserDocument> {
        return await this.userModel.findOne(filter, projection);
    }

    async findById(id: string, projection: UserModel | object = {}): Promise<UserDocument> {
        return await this.userModel.findById(id, projection);
    }

    async find(filter: object | UserModel, projection: UserModel | object = {}, option: object = {}): Promise<UserDocument[]> {
        return await this.userModel.find(filter, projection, option);
    }

    async updateOne(filter: object | UserModel, update: object | UserModel): Promise<any> {
        return await this.userModel.updateOne(filter, update);
    }

    async updateMany(filter: object | UserModel, update: object | UserModel): Promise<any> {
        return await this.userModel.updateMany(filter, update);
    }

}