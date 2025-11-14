type StorageType = "localStorage" | "sessionStorage";
interface StorageKey {
    remember_me: boolean;
}
type Key = Extract<keyof StorageKey, string>;
class CustomStorage {
    private type: StorageType;
    constructor(type: StorageType) {
        this.type = type;
    }
    /**
     * 设置
     */
    setKey<D extends StorageKey, V extends keyof StorageKey>(
        key: V,
        value: D[V]
    ): void {
        const val = typeof value === "string" ? value : JSON.stringify(value);
        window[this.type]?.setItem(key, val);
    }

    /**
     * 获取
     */
    getKey<U extends Key>(key: U): StorageKey[U] | null {
        if (typeof window === "undefined") return null;
        const result: any = window[this.type]?.getItem(key);
        try {
            return JSON.parse(result);
        } catch (e) {
            return result;
        }
    }

    /**
     * 移除
     */
    removeKey(key: Key): void {
        window[this.type]?.removeItem(key);
    }

    /**
     * key
     */
    key(index: number): Key | null {
        const k: any = window[this.type]?.key(index);
        return k;
    }

    /**
     * 清除
     */
    clear() {
        window[this.type]?.clear();
    }

    /**
     * 长度
     */
    get length() {
        return window[this.type]?.length;
    }
}

const Local = new CustomStorage("localStorage");
const Session = new CustomStorage("sessionStorage");

export { Local, Session };
