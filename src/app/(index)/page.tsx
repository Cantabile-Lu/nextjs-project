"use client";
import { useMemo } from "react";
import { Web3 } from "web3";
import { Button } from "@heroui/react";
const getData = () => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/video`, {
        method: "POST",
    }).then((res) => res.json());
};

const CreateAccount = ({ web3 }: { web3: Web3 }) => {
    return (
        <Button
            onPress={() => {
                const result = web3.eth.accounts.create("12345678901234567890");
                console.log(`🚀🚀🚀 ~ CreateAccount ~ result ~15: `, result);
            }}
        >
            创建
        </Button>
    );
};
const Page = () => {
    const web3 = useMemo(
        () =>
            new Web3(
                Web3.givenProvider ||
                    "wss://sepolia.infura.io/ws/v3/010e9ccce51d48979f9b838975c48578"
            ),
        []
    );
    console.log(`🚀🚀🚀🚀🚀-> in page.tsx on 18`, web3);

    return (
        <div>
            <CreateAccount web3={web3} />
        </div>
    );
};

export default Page;
