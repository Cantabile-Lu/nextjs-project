import ShoppingCarWidget from "./ShoppingCarWidget";
import Button from "@/components/Button";

const getData = () => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/video`, {
        method: "POST",
    }).then((res) => res.json());
};

const Page = async () => {
    return (
        <div>
            <Button />
            <ShoppingCarWidget promise={getData()} />
        </div>
    );
};

export default Page;
