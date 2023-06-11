import { ArgumentMetadata, FileTypeValidator, Injectable, MaxFileSizeValidator, ParseFilePipe, PipeTransform } from "@nestjs/common";
import { MAX_FILE_UPLOAD_SIZE } from "../constant/common.constant";

@Injectable()
export class ParseUploadedFile implements PipeTransform {
    constructor(
        private required: boolean = true
    ) { }

    async transform(value: any, metadata: ArgumentMetadata) {
        return await new ParseFilePipe({
            fileIsRequired: this.required,
            validators: [
                new MaxFileSizeValidator({ maxSize: MAX_FILE_UPLOAD_SIZE }),
                new FileTypeValidator({ fileType: '.(jpg|jpeg|png)' })
            ]
        }).transform(value);
    }
}