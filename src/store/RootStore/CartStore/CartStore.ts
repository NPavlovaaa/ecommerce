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
type PrivateFields = '_cartList' | '_meta' | '_allPoints' | '_availablePoints' | '_total_count' | '_total_cost' | '_total';


export default class CartStore{
    private _cartList: CollectionModel<number, ProductModel> = getInitialCollectionModel();
    private _meta: Meta = Meta.initial;
    private _total_cost: number = 0;
    private _total_count: number = 0;
    private _allPoints: number = 0;
    private _availablePoints: number = 0;
    private _total: number = 0;

    constructor() {
        makeObservable<CartStore, PrivateFields>(this, {
            _cartList: observable.ref,
            _meta: observable,
            _allPoints: observable,
            _availablePoints: observable,
            _total_count: observable,
            _total_cost: observable,
            _total: observable,

            cartList: computed,
            meta: computed,
            allPoints: computed,
            total_cost: computed,
            total_count: computed,
            availablePoints: computed,
            total: computed,

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

    get allPoints(): number{
        return this._allPoints;
    }

    get availablePoints(): number{
        return Math.round(this._availablePoints);
    }

    get total_cost(): number{
        return this._total_cost;
    }

    get total_count(): number{
        return this._total_count;
    }

    get total(): number{
        return Math.round(this._total);
    }

    setKeyCartList(id: number): void {
        let newKeyList: number[] = localStorage.cart ? JSON.parse(localStorage.cart) : [];
        newKeyList.push(id);
        localStorage.cart = JSON.stringify(newKeyList);
        this.getCartList()
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

        const response = await axios.get<ProductApi[]>(`${REACT_APP_URL}/products/`);

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

                    this._allPoints = Math.floor(1 + Math.random() * (2000));
                    this._total_cost = this.cartList.reduce((acc, cur) => acc + cur.price, 0);

                    this._availablePoints = this._allPoints > this._total_cost * 0.5 ? this._total_cost * 0.5 : this._allPoints;
                    this._total_count = this.cartList.length;
                    this._total = this._total_cost - this._availablePoints;
                    return;
                } catch {
                    this._meta = Meta.error;
                }
            }
            this._meta = Meta.error;
        })
    }
}