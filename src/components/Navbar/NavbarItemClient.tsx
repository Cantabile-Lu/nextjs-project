"use client";
import Image from "next/image";
import LanguageModal from "@/components/Modals/LanguageModal";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Link,
} from "@heroui/react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import cookie from "js-cookie";
import { Local } from "@/utils/storage";
import { use, useEffect, useMemo, useRef, useState } from "react";
import { server } from "@/utils/client";
interface Props {
    label: string;
    icon: string;
}
interface UserType {}
/**
 * @description 个人信息
 */
const getScoreApi = async (data: { userid: number; dynamicpass: string }) => {
    return server.request<{ score: string }>({
        url: "/api/users/getUserScore",
        method: "POST",
        data,
    });
};
/**
 * @description 语言
 */
export const LanguageNavbarItem = (props: Props) => {
    const { label, icon } = props;
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const handler = () => {
        onOpen();
    };
    return (
        <>
            <div
                onClick={handler}
                className={"flex items-center cursor-pointer"}
            >
                <Image src={icon} alt={label} height={40} width={40} />
                <span className={"ml-2"}>{label}</span>
            </div>

            <LanguageModal
                isOpen={isOpen}
                onChange={onOpenChange}
                onClose={onClose}
            />
        </>
    );
};
/**
 * @description  退出
 */
export const LogoutNavbarItem = (props: Props) => {
    const { label, icon } = props;
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const t = useTranslations();
    const router = useRouter();
    const handler = () => {
        onOpen();
    };
    const logoutHandler = () => {
        cookie.remove("Token");
        router.replace("/login");
    };
    return (
        <>
            <div
                onClick={handler}
                className={"flex items-center cursor-pointer "}
            >
                <Image src={icon} alt={label} height={40} width={40} />
                <span className={"ml-2"}>{label}</span>
            </div>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement={"center"}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Tips
                            </ModalHeader>
                            <ModalBody>
                                <p>{t("tips.logout")}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    {t("buttons.cancel")}
                                </Button>
                                <Button color="primary" onPress={logoutHandler}>
                                    {t("buttons.confirm")}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

/**
 * @description telegram link
 */
export const TelegramLinkNavbarItem = (props: Props) => {
    const { label, icon } = props;
    return (
        <Link target={"_blank"} className={"flex items-center"}>
            <Image src={icon} alt={label} height={40} width={40} />
            <span className={"ml-2 text-foreground"}>{label}</span>
        </Link>
    );
};

/**
 * @description bgm
 */
export const BGMButton = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const open = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <>
            <Image
                onClick={open}
                src={isPlaying ? "/menu/Voice.png" : "/menu/Voice-off.png"}
                width={120}
                height={120}
                alt={"more"}
            />
            <audio ref={audioRef} loop src={"/bgm.mp3"} autoPlay></audio>
        </>
    );
};
