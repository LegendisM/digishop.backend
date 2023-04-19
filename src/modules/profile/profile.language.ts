import { ILanguageStorage, Languages } from "../language/interface/language.interface";

export const ProfileLanguageStorage: ILanguageStorage[] = [
    {
        key: "update_success", values: [
            { language: Languages.FA, value: "پروفایل شما با موفقیت  ذخیره شد" },
            { language: Languages.EN, value: "Your profile has been successfully saved" }
        ],
    },
    {
        key: "already_information_used", values: [
            { language: Languages.FA, value: "قبلاً این اطلاعات توسط کاربر دیگری استفاده شده است" },
            { language: Languages.EN, value: "Already this Information used by another user." }
        ]
    },
];