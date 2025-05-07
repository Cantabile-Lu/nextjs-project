"use client";
import { ReactNode } from "react";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

export const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <div className={"container mx-auto  h-full  "}>
            <HeroUIProvider className={""}>
                <ToastProvider placement={"top-center"} toastOffset={20} />
                {children}
            </HeroUIProvider>
        </div>
    );
};
