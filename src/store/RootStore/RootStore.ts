import QueryParamsStore from "./QueryParamsStore/QueryParamsStore";
import CartStore from "./CartStore";
import AuthStore from "./AuthStore";

export default class RootStore {
    readonly query = new QueryParamsStore();
    readonly cart = new CartStore();
    readonly auth = new AuthStore();
}