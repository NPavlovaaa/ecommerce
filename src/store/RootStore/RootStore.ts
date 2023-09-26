import QueryParamsStore from "./QueryParamsStore/QueryParamsStore";
import CartStore from "./CartStore";

export default class RootStore {
    readonly query = new QueryParamsStore();
    readonly cart = new CartStore();
}