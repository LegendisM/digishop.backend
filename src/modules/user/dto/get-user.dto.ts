import { IsMongoId } from "class-validator";
import { Types } from "mongoose";
import { IntersectionType, PickType } from "@nestjs/swagger";
import { IdentifierDto } from "src/common/dto/identifier.dto";
import { BaseUserDto } from "./base-user.dto";

export class GetUserDto extends IntersectionType(
    IdentifierDto,
    PickType(
        BaseUserDto,
        ['username', 'language', 'roles']
    ),
) {
    @IsMongoId()
    _id: Types.ObjectId;
}