import ShoppingCarWidget from "./ShoppingCarWidget";

const getData = () => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/video`, {
        method: "POST",
    }).then((res) => res.json());
};

const Page = async () => {
    return (
        <div>
            <ShoppingCarWidget promise={getData()} />
        </div>
    );
};

export default Page;
