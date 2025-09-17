import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";

function parseNumberParts(value: number): [string[], string[]] {
    const [intPart, decPart = ""] = value.toFixed(2).split(".");
    const intDigits = intPart.replace(/\D/g, "").split("");
    const decimalTrimmed = decPart.replace(/0+$/, "");
    const decDigits = decimalTrimmed.split("");
    return [intDigits, decDigits];
}

type RollingDigitProps = {
    digit: number;
    previousDigit: number;
    duration?: number;
    className?: string;
};

const RollingDigit: React.FC<RollingDigitProps> = ({
    digit,
    previousDigit,
    duration = 500,
    className,
}) => {
    const listRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [digitHeight, setDigitHeight] = useState<number>(0);

    useEffect(() => {
        if (containerRef.current) {
            const height = containerRef.current.getBoundingClientRect().height;
            setDigitHeight(height);
        }
    }, []);

    useEffect(() => {
        if (digitHeight && listRef.current) {
            const scrollDistance = (digit + 10 - previousDigit) % 10; // roll forward only
            const offset = (previousDigit + scrollDistance) * digitHeight;
            listRef.current.style.transition = `transform ${duration}ms ease-in-out`;
            listRef.current.style.transform = `translateY(-${offset}px)`;
        }
    }, [digit, previousDigit, duration, digitHeight]);

    const renderDigits = () => {
        const digits: number[] = [];
        for (let i = 0; i < 20; i++) {
            digits.push(i % 10);
        }
        return digits;
    };

    return (
        <div
            ref={containerRef}
            className={clsx("overflow-hidden h-[1em]", className)}
            style={{ lineHeight: "1em" }}
        >
            <div
                ref={listRef}
                className="flex flex-col"
                style={{ willChange: "transform" }}
            >
                {renderDigits().map((n, i) => (
                    <div
                        key={i}
                        className={clsx(
                            "flex items-center justify-center",
                            className
                        )}
                        style={{ height: "1em", lineHeight: "1em" }}
                    >
                        {n}
                    </div>
                ))}
            </div>
        </div>
    );
};

type RollingNumberProps = {
    value: number;
    previousValue?: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
};

export const RollingNumber: React.FC<RollingNumberProps> = ({
    value,
    previousValue,
    duration = 500,
    prefix = "",
    suffix = "",
    className = "",
}) => {
    const [intDigits, decDigits] = parseNumberParts(value);
    const [prevIntDigits, prevDecDigits] = parseNumberParts(
        previousValue ?? value
    );

    return (
        <div className="flex items-center space-x-0.5">
            {prefix && (
                <span className={clsx("text-2xl", className)}>{prefix}</span>
            )}

            {intDigits.map((ch, idx) => {
                const curr = Number(ch);
                const prev = Number(prevIntDigits[idx] ?? ch);
                return (
                    <RollingDigit
                        key={`int-${idx}`}
                        digit={curr}
                        previousDigit={prev}
                        duration={duration}
                        className={className}
                    />
                );
            })}

            {decDigits.length > 0 && (
                <span className={clsx("text-2xl", className)}>.</span>
            )}

            {decDigits.map((ch, idx) => {
                const curr = Number(ch);
                const prev = Number(prevDecDigits[idx] ?? ch);
                return (
                    <RollingDigit
                        key={`dec-${idx}`}
                        digit={curr}
                        previousDigit={prev}
                        duration={duration}
                        className={className}
                    />
                );
            })}

            {suffix && (
                <span className={clsx("text-xl", className)}>{suffix}</span>
            )}
        </div>
    );
};
