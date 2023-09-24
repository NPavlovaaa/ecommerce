import {
    CollectionModel,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection
} from "../models/shared/collection";
import {
    getInitialProductModel,
    normalizeProduct,
    ProductApi,
    ProductModel
} from "../models/products/Product";
import {action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction} from "mobx";
import {Meta} from "utils/meta";
import axios from "axios";

import rootStore from "../RootStore/instance";

const REACT_APP_URL: string = 'https://api.escuelajs.co/api/v1';
type PrivateFields = '_productList' | '_meta' | '_productItem' | '_productListLength';


export default class ProductStore{
    private _productList: CollectionModel<number, ProductModel> = getInitialCollectionModel();
    private _productItem: ProductModel = getInitialProductModel();
    private _meta: Meta = Meta.initial;
    private _productListLength: number = 0;

    constructor() {
        makeObservable<ProductStore, PrivateFields>(this,{
            _productList: observable.ref,
            _productItem: observable.ref,
            _meta: observable,
            _productListLength: observable,

            productList: computed,
            relatedProductsList: computed,
            productItem: computed,
            meta: computed,
            productListLength: computed,

            getProductList: action,
            getProductItem: action,
            getAllProductList: action
        })
    }

    get productList(): ProductModel[] {
        return linearizeCollection(this._productList)
    }

    get productItem(): ProductModel {
        return this._productItem;
    }

    get relatedProductsList(): ProductModel[] {
        return linearizeCollection(this._productList).slice(0, 2);
    }

    get meta(): Meta {
        return this._meta;
    }

    get productListLength(): number {
        return this._productListLength;
    }

    async getAllProductList(
        title: string = rootStore.query.searchQuery,
        categoryId: number | undefined = rootStore.query.filter && rootStore.query.filter.id
    ): Promise<void> {
        this._meta = Meta.loading;

        const allProducts = await axios.get<ProductApi[]>(`${REACT_APP_URL}/products`, {
            params: {
                title: title,
                categoryId: categoryId
            }
        });

        runInAction(() => {
            if (allProducts.status === 200) {
                try {
                    this._productListLength = allProducts.data.length;
                    this._meta = Meta.success;
                    return;
                } catch {
                    this._meta = Meta.error;
                }
            }
            this._meta = Meta.error;
        })
    };

    async getProductList(
        title: string = rootStore.query.searchQuery,
        categoryId: number | undefined = rootStore.query.filter && rootStore.query.filter.id
    ): Promise<void> {

        this._meta = Meta.loading;
        this._productList = getInitialCollectionModel();

        const offset = rootStore.query.offset;
        const limit = rootStore.query.limit;

        const response = await axios.get<ProductApi[]>(`${REACT_APP_URL}/products?offset=${offset}&limit=${limit}`, {
            params: {
                title: title,
                categoryId: categoryId
            }
        });

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
        this._productItem = getInitialProductModel();

        const response = await axios.get<ProductApi>(`${REACT_APP_URL}/products/${id}`);

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


    private readonly _qpReaction: IReactionDisposer = reaction(
        () => this._productItem,
        (product) => {
            this.getProductList(undefined, product.category.id && product.category.id);
        }
    );

}