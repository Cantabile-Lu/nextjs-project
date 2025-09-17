import EN from "../../messages/en.json";
type Messages = typeof EN;

declare global {
    interface IntlMessages extends Messages {}
}
