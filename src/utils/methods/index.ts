/**
 * @description 指定字符串中间几位脱敏
 * @param str 原始字符串
 * @param startVisible 开头可见字符数
 * @param endVisible 结尾可见字符数
 * @param maskChar 脱敏字符，默认 '*'
 * @returns string
 */
export function maskString(
    str: string,
    startVisible: number,
    endVisible: number,
    maskChar: string = "*"
): string {
    if (!str) return "";
    const strLength = str.length;

    // 如果可见字符总数 >= 字符串长度，则不需要脱敏
    if (startVisible + endVisible >= strLength) {
        return str;
    }

    const maskedPart = maskChar.repeat(strLength - startVisible - endVisible);

    return str.slice(0, startVisible) + maskedPart + str.slice(-endVisible);
}

/**
 * @description 延迟函数
 */

export const sleep = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));
