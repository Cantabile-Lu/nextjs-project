"use client";
import Image from "next/image";
import {
    Input,
    Form,
    Button,
    Checkbox,
    useDisclosure,
    Spinner,
    addToast,
} from "@heroui/react";
import { useLocale, useTranslations } from "next-intl";
import LanguageModal from "@/components/Modals/LanguageModal";
import { FormEvent, useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { server } from "@/utils/client";
import { Local } from "@/utils/storage";
import cookie from "js-cookie";
import Down from "@/icon/down.svg";
import { LocaleKey, locales, localesMap } from "@/i18n/request";
interface AccountType {
    account: string;
    password: string;
}
export default function Page() {
    const t = useTranslations();
    const locale = useLocale();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const router = useRouter();

    const [initState, setInitState] = useState<Partial<AccountType>>({
        account: undefined,
        password: undefined,
    });
    const [rememberValue, setRememberValue] = useState<boolean>(false);
    // 语言对象
    const localeTarget = localesMap[locale as LocaleKey];
    const rememberChange = (value: boolean) => {
        setRememberValue(value);
        Local.setKey("remember_me", value);
    };
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));
        cookie.set("Token", "xxx");
        router.replace("/");
    };
    return (
        <>
            <div className={"flex flex-col  items-center"}>
                <Form
                    className="w-full max-w-sm flex flex-col gap-6 p-4  mt-4"
                    onSubmit={onSubmit}
                >
                    <Input
                        isRequired
                        errorMessage={t("form.nameRules")}
                        label={t("form.nameLabel")}
                        placeholder={" "}
                        value={initState.account}
                        onChange={(value) => {
                            setInitState((prev) => ({
                                ...prev,
                                account: value.target.value,
                            }));
                        }}
                        variant={"flat"}
                        labelPlacement="outside"
                        name="account"
                        type="text"
                    />

                    <Input
                        isRequired
                        errorMessage={t("form.passRules")}
                        label={t("form.passLabel")}
                        placeholder={" "}
                        labelPlacement="outside"
                        name="password"
                        value={initState.password}
                        onChange={(value) => {
                            setInitState((prev) => ({
                                ...prev,
                                password: value.target.value,
                            }));
                        }}
                        type="password"
                    />

                    <div className={"flex justify-between w-full h-8"}>
                        <div
                            className={"flex  cursor-pointer items-center"}
                            onClick={onOpen}
                        >
                            <Image
                                src={`/language/${localeTarget.icon}.png`}
                                alt={localeTarget.label}
                                className={"rounded-[50%] h-8 w-8 "}
                                width={32}
                                height={32}
                            />
                            <span className={"mx-2"}>{localeTarget.label}</span>
                            <Down />
                        </div>
                    </div>
                    <div className={"px-6 w-full"}>
                        <Button
                            color="primary"
                            type="submit"
                            spinner={<Spinner size={"sm"} />}
                            fullWidth
                        >
                            {t("buttons.submit")}
                        </Button>
                    </div>
                </Form>
            </div>
            <LanguageModal
                isOpen={isOpen}
                onChange={onOpenChange}
                onClose={onClose}
            />
        </>
    );
}
