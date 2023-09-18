import {action, computed, makeObservable, observable, runInAction, toJS} from "mobx";
import {Meta} from "utils/meta";
import axios from "axios";
import {
    CollectionModel,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection
} from "../models/shared/collection";
import {CategoryApi, CategoryModel, normalizeCategory} from "../models/products/Category";
import {Option} from "components/MultiDropdown";

const REACT_APP_URL: string = 'https://api.escuelajs.co/api/v1';
type PrivateFields = '_categoriesList' | '_meta' | '_activeCategory';

class FilterStore {
    private _categoriesList: CollectionModel<number, CategoryModel> = getInitialCollectionModel();
    private _activeCategory: Option[] = [];
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<FilterStore, PrivateFields>(this,{
            _categoriesList: observable,
            _activeCategory: observable,
            _meta: observable,

            categoriesList: computed,
            meta: computed,
            activeCategory: computed,

            getCategoriesList: action,
            changeActiveCategory: action
        })
    }


    get categoriesList(): Array<{id: number, name: string}>{
       return linearizeCollection(this._categoriesList).map(({ id, name }) => ({ id, name}));
    }

    get activeCategory(): Option[] {
        return this._activeCategory;
    }

    get meta(): Meta {
        return this._meta;
    }

    changeActiveCategory(options: Option[]){
        this._activeCategory = options;
    }

    async getCategoriesList(): Promise<void> {
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
export default new FilterStore();