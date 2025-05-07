import Car from "@/icon/car.svg";
import { server } from "@/utils/server";

const getData = () => {
    return server.request({
        url: "/vjh/buyer/cart/videos",
    });
};
const ShoppingCarWidget = () => {
    return (
        <div className={"fixed bottom-20 right-20 "}>
            <div
                className={
                    "w-14 h-14  flex justify-center bg-[#FEFEFE] items-center rounded-full shadow-md"
                }
            >
                <Car />
            </div>
        </div>
    );
};
const Page = async () => {
    const result = await getData();
    console.log(`🚀🚀🚀🚀🚀-> in page.tsx on 25`, result);
    return (
        <div>
            <ShoppingCarWidget />
        </div>
    );
};

export default Page;
