"use client";
import Down from "@/icon/down.svg";
import { Link } from "@heroui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function Back() {
    const t = useTranslations();

    const router = useRouter();
    return (
        <div className={"w-full h-16 md:h-40 flex items-end  p-2  "}>
            <div
                onClick={() => {
                    router.back();
                }}
                className={"flex items-center cursor-pointer"}
            >
                <div className={"rotate-90 mr-2"}>
                    <Down />
                </div>
                <p className={"text-foreground"}>{t("navbar.back")}</p>
            </div>
        </div>
    );
}
