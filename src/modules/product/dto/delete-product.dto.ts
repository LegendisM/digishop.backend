import { IsMongoId, IsString } from "class-validator";


export class DeleteProductDto {

    @IsString()
    @IsMongoId()
    id: string;

}