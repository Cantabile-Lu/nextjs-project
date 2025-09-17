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
    Button,
    cn,
} from "@heroui/react";
import { Card, CardType } from "./Card";
import { FC, ReactNode, use, useState, Key, useRef } from "react";
import { Badge } from "@heroui/badge";
interface DataTabsProps {
    items: {
        title: ReactNode | string;
        render: ReactNode | string;
        key: string;
    }[];
    onChange: (key: string) => void;
}
const DataTabs: FC<DataTabsProps> = (props) => {
    const { items, onChange } = props;
    const changeHandler = (key: Key) => {
        onChange(key as string);
    };
    return (
        <Tabs
            aria-label="Options"
            inert={true}
            classNames={{
                tabList:
                    "gap-6   w-full relative  rounded-none p-0 border-b border-divider",
                cursor: "w-full bg-[#000]",
                tab: "max-w-fit px-0 h-12 ",
                tabContent: "group-data-[selected=true]:text-[#000]",
            }}
            destroyInactiveTabPanel={false}
            color="primary"
            onSelectionChange={changeHandler}
            variant="underlined"
        >
            {items.map((item, index) => {
                return (
                    <Tab key={item.key} title={item.title}>
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
    const source = {
        video: data as CardType[],
        picture: [] as CardType[],
        music: [] as CardType[],
    };
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const business = useRef("video");

    const [selectedData, setSelectedData] = useState<CardType[]>(source.video);

    // 总价
    const total = selectedData
        .reduce((pre, cur) => (cur.checked ? pre + cur.price : pre), 0)
        .toFixed(2);
    // 选中数量
    const checkLen = selectedData.reduce(
        (pre, cur) => (cur.checked ? pre + 1 : pre),
        0
    );
    // 是否全选
    const isCheckAll =
        selectedData.length > 0 &&
        selectedData.every((item) =>
            item.auditStatus === "SUCCESS" ? item.checked : true
        );
    const items = [
        {
            title: (
                <div className="flex items-center space-x-2">
                    <span>视频</span>
                    <span className={"ml-2"}>{source.video.length}</span>
                </div>
            ),
            key: "video",
            render: <Card data={selectedData} onChange={setSelectedData} />,
        },
        {
            title: (
                <div className="flex items-center space-x-2">
                    <span>图片</span>
                </div>
            ),
            key: "picture",
            render: <Card data={[]} onChange={() => {}} />,
        },
        {
            title: (
                <div className="flex items-center space-x-2">
                    <span>音乐</span>
                </div>
            ),
            key: "music",
            render: <Card data={[]} onChange={() => {}} />,
        },
    ];
    return (
        <>
            <div className={"fixed bottom-20 right-20 "} onClick={onOpen}>
                <Badge
                    color="primary"
                    content={data.length}
                    shape={"rectangle"}
                >
                    <div
                        className={
                            "w-14 h-14  flex justify-center bg-[#FEFEFE] items-center rounded-full shadow-md"
                        }
                    >
                        <Car />
                    </div>
                </Badge>
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
                                <DataTabs
                                    items={items}
                                    onChange={(key) => {
                                        business.current = key;
                                        setSelectedData(
                                            source[
                                                key as
                                                    | "video"
                                                    | "picture"
                                                    | "music"
                                            ]
                                        );
                                    }}
                                />
                            </DrawerBody>
                            <DrawerFooter>
                                <div className={" w-full h-40 px-5 py-8  "}>
                                    <div
                                        className={
                                            "flex justify-between items-center"
                                        }
                                    >
                                        <Checkbox
                                            size={"sm"}
                                            isSelected={isCheckAll}
                                            onChange={(value) => {
                                                if (value.target.checked) {
                                                    const newData =
                                                        selectedData.map(
                                                            (item) => {
                                                                if (
                                                                    item.auditStatus ===
                                                                    "SUCCESS"
                                                                ) {
                                                                    item.checked =
                                                                        true;
                                                                }

                                                                return item;
                                                            }
                                                        );
                                                    setSelectedData(newData);
                                                } else {
                                                    const newData =
                                                        selectedData.map(
                                                            (item) => {
                                                                item.checked =
                                                                    false;
                                                                return item;
                                                            }
                                                        );
                                                    setSelectedData(newData);
                                                }
                                            }}
                                        >
                                            全选
                                        </Checkbox>
                                        <div
                                            className={
                                                "flex items-baseline space-x-5 "
                                            }
                                        >
                                            <p>
                                                <span>已选</span>
                                                <span className={"mx-2"}>
                                                    {checkLen}
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

                                    <Button
                                        fullWidth
                                        isDisabled={!checkLen}
                                        onPress={() => {
                                            console.log(
                                                `🚀🚀🚀🚀🚀-> 结算商品为：`,
                                                selectedData
                                                    .filter(
                                                        (item) => item.checked
                                                    )
                                                    .map((item) => item.vid),

                                                selectedData.filter(
                                                    (item) => item.checked
                                                ),
                                                `总价为：${total}`,
                                                `业务线：${business.current}`
                                            );
                                        }}
                                        radius={"full"}
                                        size={"lg"}
                                        className={cn(
                                            checkLen === 0
                                                ? "#ccc cursor-move"
                                                : "bg-[#0D0D0D]",
                                            "mt-4  text-[white] shadow-lg"
                                        )}
                                    >
                                        结算
                                    </Button>
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
