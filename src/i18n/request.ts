import { getRequestConfig } from "next-intl/server";
import { getLocale } from "@/i18n/actions";

const modulesFiles = require.context("../../messages", true, /\.json$/);
export const localeKeys = modulesFiles.keys().map((modulePath: string) => {
    return modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
});

export const localesMap = {
    ZH: { label: "中文", icon: "Chinese", code: "ZH" }, //  中国
    EN: { label: "English", icon: "English", code: "EN" }, //  英语
    KH: { label: "Cambodia", icon: "Cambodia", code: "KH" }, //  柬埔寨
    IN: { label: "Hindi", icon: "Hindi", code: "IN" }, //  印地语
    ID: { label: "Indonesia", icon: "Indonesia", code: "ID" }, //  印度尼西亚
    JP: { label: "Japan", icon: "Japan", code: "JP" }, //  日本
    KR: { label: "Korea", icon: "Korea", code: "KR" }, //  韩国
    MM: { label: "Myanmar", icon: "Myanmar", code: "MM" }, //  缅甸
    PH: { label: "Philippines", icon: "Philippines", code: "PH" }, //  菲律宾
    PT: { label: "Portugal", icon: "Portugal", code: "PT" }, //  葡萄牙
    TH: { label: "Thailand", icon: "Thailand", code: "TH" }, //  泰国
    VN: { label: "Vietnam", icon: "Vietnam", code: "VN" }, //  越南
};
export type LocaleKey = keyof typeof localesMap;
export const locales = localeKeys.map((key) => localesMap[key as LocaleKey]);
export const defaultLocale = "en";
export default getRequestConfig(async () => {
    const locale = await getLocale();
    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
    };
});
