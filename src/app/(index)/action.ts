"use server";
import { sleep } from "@/utils/methods";
export interface UserTypes {
    phone: string;
    password: string;
    email: string;
}
export async function createPerson(preState: UserTypes, formData: FormData) {
    let data = Object.fromEntries(formData) as unknown as UserTypes;
    await sleep(2000);
    if (data.password.length < 6) {
        return Promise.resolve({
            ...data,
            password: "",
            message: "password must be at least 6 characters long",
        });
    }
    return Promise.resolve({ ...data, message: "success" });
}
