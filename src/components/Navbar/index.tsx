import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    NavbarContent,
    Link,
} from "@heroui/react";
import SmallLogo from "@/icon/smallLogo.svg";
import BigLogo from "@/icon/bigLogo.svg";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
    BGMButton,
    LanguageNavbarItem,
    LogoutNavbarItem,
    TelegramLinkNavbarItem,
    UserNavbarItem,
} from "./NavbarItemClient";
import { ReactNode, use } from "react";
import clsx from "clsx";
import { server } from "@/utils/server";

interface NavbarItemProps {
    label: string;
    icon: string;
    href?: string;
    children?: ReactNode;
    isBorder?: boolean;
}
const NavbarItem = ({ item }: { item: NavbarItemProps }) => {
    const borderCls = clsx(
        "h-16  flex items-center ",
        item.isBorder ? "border-t border-t-bg-100 " : ""
    );
    return (
        <NavbarMenuItem>
            <div className={borderCls}>
                {item.children ? (
                    item.children
                ) : (
                    <Link href={item.href} size="lg" color={"foreground"}>
                        <Image
                            src={item.icon}
                            alt={item.label}
                            height={40}
                            width={40}
                        />
                        <span className={"ml-2"}>{item.label}</span>
                    </Link>
                )}
            </div>
        </NavbarMenuItem>
    );
};

export default async function App() {
    const t = await getTranslations();

    const menuItems = [
        {
            icon: "/menu/ScoreLog.png",
            label: t("navbar.log"),
            id: 1,
            href: "/score",
        },
        {
            icon: "/menu/GameHistory.png",
            label: t("navbar.history"),
            id: 2,
            href: "/history",
        },
        {
            icon: "/menu/ChangePassword.png",
            label: t("navbar.password"),
            id: 3,
            href: "/password",
        },
        {
            id: 4,
            icon: "/menu/Language1.png",
            label: "",
            children: (
                <LanguageNavbarItem
                    icon={"/menu/Language1.png"}
                    label={t("navbar.language")}
                />
            ),
        },

        {
            icon: "/menu/CustomerService.png",
            label: "",
            id: 5,
            children: (
                <TelegramLinkNavbarItem
                    icon={"/menu/CustomerService.png"}
                    label={t("navbar.service")}
                />
            ),
        },
        {
            icon: "/menu/Logout.png",
            label: "",
            id: 6,
            isBorder: true,
            children: (
                <LogoutNavbarItem
                    label={t("navbar.logout")}
                    icon={"/menu/Logout.png"}
                />
            ),
        },
    ];

    return (
        <Navbar isBordered className={"bg-bg-100 "} maxWidth={"full"}>
            <NavbarContent className="sm:hidden " justify="start">
                <SmallLogo />
            </NavbarContent>

            <NavbarContent className="hidden sm:flex  " justify="start">
                <BigLogo />
            </NavbarContent>
            <NavbarContent justify="end" className={""}>
                <UserNavbarItem />
                <div className={"size-10 "}>
                    <BGMButton />
                </div>
                <NavbarMenuToggle
                    className={"text-primary  size-10"}
                    icon={
                        <Image
                            src={"/menu/More.png"}
                            width={120}
                            height={120}
                            alt={"more"}
                        />
                    }
                ></NavbarMenuToggle>
                <NavbarMenu>
                    <div className={"container mx-auto "}>
                        {menuItems.map((item, index) => (
                            <NavbarItem key={index} item={item} />
                        ))}
                    </div>
                </NavbarMenu>
            </NavbarContent>
        </Navbar>
    );
}
