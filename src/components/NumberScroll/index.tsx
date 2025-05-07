import React from "react";
import { Jackpot } from "@/styles/font";
import styles from "./style.module.css";
const NumberScroll = () => {
    return (
        <div className={`${Jackpot.className} text-6xl`}>
            <div
                className={`${styles.box} overflow-hidden h-20 leading-20 w-10 bg-primary `}
            >
                <span className={"absolute left-1/2 -translate-x-1/2 top-10"}>
                    0123456789
                </span>
            </div>
        </div>
    );
};

export default NumberScroll;
