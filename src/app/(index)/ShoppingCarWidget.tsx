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
    Checkbox,
} from "@heroui/react";
import { Card, CardType } from "./Card";
import { FC, ReactNode, use, useState } from "react";
interface DataTabsProps {
    items: {
        title: ReactNode | string;
        render: ReactNode | string;
    }[];
}
const DataTabs: FC<DataTabsProps> = (props) => {
    const { items } = props;

    return (
        <Tabs
            aria-label="Options"
            classNames={{
                tabList:
                    "gap-6   w-full relative  rounded-none p-0 border-b border-divider",
                cursor: "w-full bg-[#000]",
                tab: "max-w-fit px-0 h-12 ",
                tabContent: "group-data-[selected=true]:text-[#000]",
            }}
            destroyInactiveTabPanel={false}
            color="primary"
            variant="underlined"
        >
            {items.map((item, index) => {
                return (
                    <Tab key={index} title={item.title}>
                        {item.render}
                    </Tab>
                );
            })}
        </Tabs>
    );
};
interface ShoppingCarWidgetProps {
    promise: Promise<{ data: CardType[]; code: number }>;
}
const ShoppingCarWidget: FC<ShoppingCarWidgetProps> = (props) => {
    const { promise } = props;
    const { data } = use(promise);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [total, setTotal] = useState(0);
    const [selectedData, setSelectedData] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const items = [
        {
            title: (
                <div className="flex items-center space-x-2">
                    <span>视频</span>
                    <span className={"ml-2"}>{data.length}</span>
                </div>
            ),
            render: <Card data={data} />,
        },
    ];
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

            <Drawer
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size={"lg"}
                radius={"none"}
            >
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">
                                购物车
                            </DrawerHeader>
                            <DrawerBody>
                                <DataTabs items={items} />
                            </DrawerBody>
                            <DrawerFooter>
                                <div className={"border w-full h-44 p-4"}>
                                    <div
                                        className={
                                            "flex justify-between items-center"
                                        }
                                    >
                                        <Checkbox
                                            size={"sm"}
                                            value={checkAll}
                                            onChange={setCheckAll}
                                        >
                                            全选
                                        </Checkbox>
                                        <div className={"flex items-center"}>
                                            <p>
                                                <span>已选</span>
                                                <span className={"mx-2"}>
                                                    {selectedData.length}
                                                </span>
                                                <span>件</span>
                                            </p>
                                            <p>
                                                <span>总计：</span>
                                                <span
                                                    className={
                                                        "mx-2 text-[#EE4A4A] text-2xl font-medium"
                                                    }
                                                >
                                                    {total}
                                                </span>
                                                <span
                                                    className={"text-[#EE4A4A]"}
                                                >
                                                    元
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default ShoppingCarWidget;
