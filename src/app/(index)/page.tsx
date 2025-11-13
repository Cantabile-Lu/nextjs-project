import ShoppingCarWidget from "./ShoppingCarWidget";
import Button from "@/components/Button";
import { useMemo } from "react";
import { Web3 } from "web3";

const getData = () => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/video`, {
        method: "POST",
    }).then((res) => res.json());
};

const Page = async () => {
    const web3 = useMemo(
        () => new Web3(Web3.givenProvider || "ws://localhost:8545"),
        []
    );
    console.log(`🚀🚀🚀🚀🚀-> in page.tsx on 18`, web3);

    return (
        <div>
            <Button />
        </div>
    );
};

export default Page;
