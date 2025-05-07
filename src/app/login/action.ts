"use server";

import { cookies } from "next/headers";

export const loginAction = async (token: string) => {
    const cookie = await cookies();
    return cookie.set("Token", token);
};
