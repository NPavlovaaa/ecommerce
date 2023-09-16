import {
    CollectionModel,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection
} from "../models/shared/collection";
import {normalizeProduct, ProductApi, ProductModel} from "../models/products/Product";
import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {Meta} from "../../utils/meta";
import axios from "axios";

const PRODUCT_LIST_URL: string = 'https://api.escuelajs.co/api/v1/products';
type PrivateFields = "_productList" | '_meta';

export default class ProductStore{
    private _productList: CollectionModel<number, ProductModel> = getInitialCollectionModel();
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<ProductStore, PrivateFields>(this,{
            _productList: observable.ref,
            _meta: observable,
            productList: computed,
            meta: computed,
            getProductList: action
            }
        )
    }

    get productList(): ProductModel[] {
        return linearizeCollection(this._productList);
    }

    get meta(): Meta {
        return this._meta;
    }

    async getProductList(): Promise<void> {
        this._meta = Meta.loading;
        this._productList = getInitialCollectionModel();

        const response = await axios.get<ProductApi[]>(PRODUCT_LIST_URL);

        runInAction(() => {
            if (response.status === 200) {
                try {
                    const list: ProductModel[] = [];
                    for (const item of response.data) {
                        list.push(normalizeProduct(item));
                    }
                    this._meta = Meta.success;
                    this._productList = normalizeCollection(list, ((listItem) => listItem.id));
                    return;
                } catch {
                    this._meta = Meta.error;
                }
            }
            this._meta = Meta.error;
        })
    };
}