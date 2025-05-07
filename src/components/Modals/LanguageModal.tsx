import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { useLocale, useTranslations } from "next-intl";
import { locales } from "@/i18n/request";
import Image from "next/image";
import { setLocale } from "@/i18n/actions";

import { useTransition } from "react";
import clsx from "clsx";

interface Props {
    isOpen: boolean;
    onChange: () => void;
    onClose: () => void;
}

const LanguageModal = ({ isOpen, onChange, onClose }: Props) => {
    const t = useTranslations();
    const [isPending, startTransition] = useTransition();
    const localeKey = useLocale();
    const handler = (locale: string) => {
        startTransition(() => {
            setLocale(locale);
            onClose();
        });
    };

    return (
        <Modal
            isKeyboardDismissDisabled={true}
            isOpen={isOpen}
            placement={"auto"}
            size={"xl"}
            onOpenChange={onChange}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 items-center">
                    {t("modals.language.title")}
                </ModalHeader>
                <ModalBody>
                    <div className={"grid grid-cols-3 md:grid-cols-4 gap-2"}>
                        {locales.map((locale, index) => {
                            return (
                                <div
                                    onClick={() => handler(locale.code)}
                                    key={index}
                                    className={` flex flex-col items-center  p-4 rounded-xl  hover:bg-hover-background transition-colors duration-300 cursor-default
                                    relative`}
                                >
                                    <Image
                                        src={`/language/${locale.icon}.png`}
                                        alt={locale.icon}
                                        className={"w-12 h-12  rounded-full"}
                                        width={52}
                                        height={52}
                                    />
                                    <p className={"mt-2"}>{locale.label}</p>

                                    <div
                                        className={clsx(
                                            "absolute bottom-0 right-0 left-0 w-full h-0.5 ",
                                            localeKey === locale.code
                                                ? "bg-primary"
                                                : "bg-transparent"
                                        )}
                                    ></div>
                                </div>
                            );
                        })}
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default LanguageModal;
