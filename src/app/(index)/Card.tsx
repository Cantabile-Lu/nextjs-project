import { CheckboxGroup, Checkbox, Divider, cn } from "@heroui/react";
import { ChangeEvent, FC, MouseEvent, useState } from "react";
import { Random } from "mockjs";

export interface CardType {
    auditStatus: "SUCCESS" | "FAIL"; // 分别代表上架下架​
    coverImage: string; // 封面图​
    price: number; // 个人授权价格​
    softwareType: "视频素材" | "AE模板" | "C4D模版"; // 类型​
    title: string; // 素材标题​
    licType: "NP" | "LP" | "LPPLUS"; // 加入购物车时选的授权类型：“个人授权” ｜ “企业授权” ｜ “企业PLUS” ​
    vid: number; // 素材唯一id
    checked?: boolean; // 是否选中​
}
interface CardProps {
    data: CardType[];
    onChange: (data: CardType[]) => void;
}
const warrantTarget = {
    NP: "个人授权",
    LP: "企业授权",
    LPPLUS: "企业PLUS",
};
export const Card: FC<CardProps> = (props) => {
    const { data, onChange } = props;
    const defaultKeys = data
        .filter((item) => item.checked)
        .map((item) => `${item.vid}`);

    const removeHandler = (cardItem: CardType, index: number) => {
        const newData = data.filter((item) => item.vid !== cardItem.vid);
        onChange(newData);
    };

    const changeHandler = (values: string[]) => {
        const newData = data.filter((item) => {
            item.checked = values.includes(`${item.vid}`);
            return item;
        });
        onChange(newData);
    };
    if (data.length === 0) {
        return (
            <div className={"flex items-center justify-center h-[60vh] w-full"}>
                暂无数据
            </div>
        );
    }
    return (
        <CheckboxGroup onChange={changeHandler} value={defaultKeys}>
            {data.map((cardItem, index) => {
                const isFall = cardItem.auditStatus === "FAIL";
                return (
                    <div
                        className={cn(
                            " group w-full  m-0",
                            "hover:bg-content2",
                            "cursor-pointer rounded-lg gap-2 p-4"
                        )}
                        key={cardItem.vid}
                    >
                        <div className={"flex items-center"}>
                            <Checkbox
                                value={`${cardItem.vid}`}
                                isDisabled={isFall}
                                size={"sm"}
                            ></Checkbox>
                            <div className={"w-full flex space-x-4 ml-4"}>
                                <div className={"relative"}>
                                    <img
                                        src={cardItem.coverImage}
                                        alt={cardItem.title}
                                        className={"rounded"}
                                    />
                                    {isFall && (
                                        <div
                                            className={
                                                "absolute top-0 left-0 right-0 bottom-0 bg-[#000]/20 flex items-center" +
                                                " justify-center text-[white] "
                                            }
                                        >
                                            下架
                                        </div>
                                    )}
                                </div>

                                <div className={"flex-1 "}>
                                    <h1
                                        className={
                                            " text-ellipsis my-2 text-[#0D0D0D] text-base font-medium"
                                        }
                                    >
                                        {cardItem.title}
                                    </h1>
                                    <div className="flex h-5 items-center space-x-4 text-small text-[#404040] ">
                                        <div className={"space-x-2 "}>
                                            <span>ID:</span>
                                            <span>{cardItem.vid}</span>
                                        </div>
                                        <Divider
                                            orientation="vertical"
                                            className={"bg-[#CCCCCC]"}
                                        />
                                        <div className={"space-x-2 "}>
                                            <span>类型:</span>
                                            <span>{cardItem.softwareType}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"flex justify-between mt-3 text-sm"}>
                            <div
                                className={
                                    "opacity-0 group-hover:opacity-100  transition-opacity  duration-1000  ml-10"
                                }
                                onClick={() => removeHandler(cardItem, index)}
                            >
                                移除
                            </div>
                            <div>
                                <span className={"mr-5"}>
                                    {warrantTarget[cardItem.licType]}
                                </span>
                                <span className={"font-semibold text-xl"}>
                                    {cardItem.price}
                                </span>
                                <span>元</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </CheckboxGroup>
    );
};
