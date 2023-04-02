import { Module, DynamicModule } from "@nestjs/common";
import { ILanguageStorage } from "./interface/language.interface";
import { LanguageService } from "./language.service";

@Module({})
export class LanguageModule {
    static register(storage: ILanguageStorage[]): DynamicModule {
        return {
            module: LanguageModule,
            providers: [
                {
                    provide: 'LANGUAGE_STORAGE',
                    useValue: storage
                },
                LanguageService,
            ],
            exports: [LanguageService]
        }
    }
}