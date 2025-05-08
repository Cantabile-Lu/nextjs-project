import ShoppingCarWidget from "./ShoppingCarWidget";

// const getData = () => {
//     return fetch("http://localhost:3000/api/video")
//         .then((res) => res.json())
//         .then((res) => {
//             console.log(`🚀🚀🚀🚀🚀-> in page.tsx on 6`, res);
//         });
// };

const Page = async () => {
    return (
        <div>
            <ShoppingCarWidget />
        </div>
    );
};

export default Page;
