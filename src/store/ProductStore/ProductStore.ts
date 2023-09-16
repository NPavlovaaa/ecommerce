import {
    CollectionModel,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection
} from "../models/shared/collection";
import {getInitialModel, normalizeProduct, ProductApi, ProductModel} from "../models/products/Product";
import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {Meta} from "utils/meta";
import axios from "axios";

const PRODUCT_LIST_URL: string = 'https://api.escuelajs.co/api/v1/products';
type PrivateFields = '_productList' | '_meta' | '_productItem';

export default class ProductStore{
    private _productList: CollectionModel<number, ProductModel> = getInitialCollectionModel();
    private _productItem: ProductModel = getInitialModel();
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<ProductStore, PrivateFields>(this,{
            _productList: observable.ref,
            _productItem: observable.ref,
            _meta: observable,
            productList: computed,
            relatedProductsList: computed,
            productItem: computed,
            meta: computed,
            getProductList: action,
            getProductItem: action
        })
    }

    get productList(): ProductModel[] {
        return linearizeCollection(this._productList);
    }

    get productItem(): ProductModel {
        return this._productItem;
    }

    get relatedProductsList(): ProductModel[] {
        return linearizeCollection(this._productList).filter(item => item.category.id === this._productItem.category.id).slice(0, 2);
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

    async getProductItem(id: string): Promise<void> {
        this._meta = Meta.loading;
        this._productItem = getInitialModel();

        const response = await axios.get<ProductApi>(`${PRODUCT_LIST_URL}/${id}`);

        runInAction(() => {
            if (response.status === 200) {
                try {
                    this._meta = Meta.success;
                    this._productItem = normalizeProduct(response.data);
                    return;
                } catch {
                    this._meta = Meta.error;
                }
            }
            this._meta = Meta.error;
        })
    };
}