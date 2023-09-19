import {action, computed, makeObservable, observable, runInAction} from 'mobx';
import {Option} from "components/MultiDropdown/MultiDropdown.tsx";
import {Meta} from "utils/meta.ts";
import {
    CollectionModel,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection
} from "../../models/shared/collection";
import axios from "axios";
import {CategoryApi, CategoryModel, normalizeCategory} from "../../models/products/Category";

const REACT_APP_URL: string = 'https://api.escuelajs.co/api/v1';

type PrivateFields = "_meta" | "_currentPage" | "_searchQuery" | "_selectedFilters" | "_categoriesList";

export default class QueryParamsStore {
    private _meta: Meta = Meta.initial;
    private _categoriesList: CollectionModel<number, CategoryModel> = getInitialCollectionModel();

    private _currentPage: number = 1;
    private _searchQuery: string = "";
    private _selectedFilters: Option[] = [];

    constructor() {
        makeObservable<QueryParamsStore, PrivateFields>(this, {
            _categoriesList: observable,
            _meta: observable,
            _currentPage: observable,
            _searchQuery: observable,
            _selectedFilters: observable.ref,

            meta: computed,
            currentPage: computed,
            searchQuery: computed,
            selectedFilters: computed,
            categoryList: computed,

            setPage: action,
            setSearchQuery: action,
            setFilters: action,
            getCategoryList: action,
        });
    }

    get meta(): Meta {
        return this._meta;
    }

    get currentPage(): number {
        return this._currentPage;
    }

    get searchQuery(): string {
        return this._searchQuery;
    }

    get selectedFilters(): Option[] {
        return this._selectedFilters;
    }
    get categoryList(): Array<{id: number, name: string}>{
        return linearizeCollection(this._categoriesList).map(({ id, name }) => ({ id, name}));
    }

    setPage(page: number) {
        this._currentPage = page;
    }

    setSearchQuery(value: string) {
        this._searchQuery = value;
    }

    setFilters(filters: []) {
        this._selectedFilters = filters;
    }


    async getCategoryList(): Promise<void> {
        this._meta = Meta.loading;
        this._categoriesList = getInitialCollectionModel();

        const response = await axios.get<CategoryApi[]>(`${REACT_APP_URL}/categories`);

        runInAction(() => {
            if (response.status === 200) {
                try {
                    const list: CategoryModel[] = [];
                    for (const item of response.data) {
                        list.push(normalizeCategory(item));
                    }
                    this._meta = Meta.success;
                    this._categoriesList = normalizeCollection(list, ((listItem) => listItem.id));
                    return;
                } catch {
                    this._meta = Meta.error;
                }
            }
            this._meta = Meta.error;
        })
    };

}

