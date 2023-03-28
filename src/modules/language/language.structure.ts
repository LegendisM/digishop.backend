export enum Languages {
    EN = "EN",
    FA = "FA"
}

export interface ILanguageStorage {
    key: string;
    values: ILanguageStorageValue[]
}

export interface ILanguageStorageValue {
    language: Languages;
    value: string;
}