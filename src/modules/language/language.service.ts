import { Inject, Injectable } from "@nestjs/common";
import { ILanguageStorage, Languages } from "./interface/language.interface";
import { REQUEST } from "@nestjs/core";

@Injectable()
export class LanguageService {
    constructor(
        @Inject(REQUEST) private request,
        @Inject("LANGUAGE_STORAGE") private storage: ILanguageStorage[],
    ) { }

    get(key: string, language: Languages = Languages.FA): string {
        if (this.request?.user?.language) {
            language = this.request.user.language;
        }
        return this.storage.find((locale) => locale.key == key)?.values.find((lang) => lang.language == language)?.value ?? key;
    }
}