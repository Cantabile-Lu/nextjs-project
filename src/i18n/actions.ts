"use server";
import { cookies } from "next/headers";
import { defaultLocale } from "./request";

export const setLocale = async (locale: string) => {
    const cookie = await cookies();
    cookie.set("NEXT_LOCALE", locale);
};
export async function getLocale() {
    return (await cookies()).get("NEXT_LOCALE")?.value || defaultLocale;
}
