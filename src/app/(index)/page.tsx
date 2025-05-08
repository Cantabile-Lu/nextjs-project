import ShoppingCarWidget from "./ShoppingCarWidget";

const getData = () => {
    return fetch("http://localhost:3000/api/video", {
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
