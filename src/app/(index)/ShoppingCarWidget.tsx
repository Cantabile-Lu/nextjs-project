"use client";
import Car from "@/icon/car.svg";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    useDisclosure,
    Tabs,
    Tab,
} from "@heroui/react";
import { Card } from "./Card";
const DataTabs = () => {
    return (
        <Tabs
            aria-label="Options"
            classNames={{
                tabList:
                    "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                cursor: "w-full bg-[#000]",
                tab: "max-w-fit px-0 h-12",
                tabContent: "group-data-[selected=true]:text-[#000]",
            }}
            color="primary"
            variant="underlined"
        >
            <Tab
                key="photos"
                title={
                    <div className="flex items-center space-x-2">
                        <span>视频</span>
                        <span className={"ml-2"}>9</span>
                    </div>
                }
            >
                <Card />
            </Tab>
            <Tab
                key="music"
                title={
                    <div className="flex items-center space-x-2">
                        <span>图片</span>
                        <span className={"ml-2"}>9</span>
                    </div>
                }
            />
            <Tab
                key="videos"
                title={
                    <div className="flex items-center space-x-2">
                        <span>音乐</span>
                    </div>
                }
            />
        </Tabs>
    );
};
const ShoppingCarWidget = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <div className={"fixed bottom-20 right-20 "} onClick={onOpen}>
                <div
                    className={
                        "w-14 h-14  flex justify-center bg-[#FEFEFE] items-center rounded-full shadow-md"
                    }
                >
                    <Car />
                </div>
            </div>

            <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">
                                购物车
                            </DrawerHeader>
                            <DrawerBody>
                                <DataTabs />
                            </DrawerBody>
                            <DrawerFooter>
                                <div className={"border w-full h-80"}>123</div>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default ShoppingCarWidget;
