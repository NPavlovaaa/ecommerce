import {normalizeProduct, ProductApi, ProductModel} from "../../models/products/Product";
import {
    CollectionModel,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection
} from "../../models/shared/collection";
import {Meta} from "utils/meta";
import {action, computed, makeObservable, observable, runInAction} from "mobx";
import axios from "axios";

const REACT_APP_URL: string = 'https://api.escuelajs.co/api/v1';
type PrivateFields = '_cartList' | '_meta';


export default class CartStore{
    private _cartList: CollectionModel<number, ProductModel> = getInitialCollectionModel();
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<CartStore, PrivateFields>(this,{
            _cartList: observable.ref,
            _meta: observable,

            cartList: computed,
            meta: computed,

            deleteKeyCartList: action,
            setKeyCartList: action,
            getCartList: action,
        })
    }

    get cartList(): ProductModel[] {
        return linearizeCollection(this._cartList)
    }

    get meta(): Meta{
        return this._meta;
    }

    setKeyCartList(id: number): void {
        let newKeyList: number[] = localStorage.cart ? JSON.parse(localStorage.cart) : [];
        newKeyList.push(id);
        localStorage.cart = JSON.stringify(newKeyList);

    }

    deleteKeyCartList(id: number): void {
        let newKeyList: number[] = localStorage.cart ? JSON.parse(localStorage.cart) : [];
        newKeyList = newKeyList.filter(item => item !== id);
        localStorage.cart = JSON.stringify(newKeyList);
        this.getCartList()
    }

    async getCartList(): Promise<void>{
        this._cartList = getInitialCollectionModel();
        this._meta = Meta.loading;

        const response = await axios.get<ProductApi[]>(`${REACT_APP_URL}/products/`)

        runInAction(() => {

            if (response.status === 200) {
                try {
                    const keysCartList = JSON.parse(localStorage.cart) || [];

                    let list: ProductModel[] = [];
                    for (const item of response.data) {
                        list.push(normalizeProduct(item));
                    }
                    this._meta = Meta.success;
                    this._cartList = normalizeCollection(list.filter(item => keysCartList.some((key: number) => item.id === key)),
                        ((listItem) => listItem.id));

                    return;
                } catch {
                    this._meta = Meta.error;
                }
            }
            this._meta = Meta.error;
        })
    }
}