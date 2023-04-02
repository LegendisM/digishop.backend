import { ILanguageStorage, Languages } from "../language/interface/language.interface";


export const AuthLanguageStorage: ILanguageStorage[] = [
    {
        key: "signup_success", values: [
            { language: Languages.FA, value: "ثبت نام با موفقیت انجام شد" },
            { language: Languages.EN, value: "Signup Successfully" }
        ]
    },
    {
        key: "already_username_used", values: [
            { language: Languages.FA, value: "قبلاً این نام کاربری توسط کاربر دیگری استفاده شده است" },
            { language: Languages.EN, value: "Already this username used by another user." }
        ]
    },
    {
        key: "signin_success", values: [
            { language: Languages.FA, value: "ورود با موفقیت انجام شد" },
            { language: Languages.EN, value: "Signin Successfully" }
        ]
    },
    {
        key: "invalid_information", values: [
            { language: Languages.FA, value: "نام کاربری یا رمز عبور صحیح نمی باشد" },
            { language: Languages.EN, value: "Username or Password incorrect" }
        ]
    },
];