import EN from "../../messages/EN.json";
type Messages = typeof EN;

declare global {
    interface IntlMessages extends Messages {}
}
