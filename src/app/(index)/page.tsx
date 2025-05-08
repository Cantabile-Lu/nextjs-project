import Car from "@/icon/car.svg";

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
    return (
        <div>
            <ShoppingCarWidget />
        </div>
    );
};

export default Page;
