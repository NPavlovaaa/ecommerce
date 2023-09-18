import {action, computed, makeObservable, observable} from "mobx";

type PrivateFields = '_search';

class SearchStore {
    private _search: string = '';

    constructor() {
        makeObservable<SearchStore, PrivateFields>(this,{
            _search: observable,
            search: computed,
            setSearch: action,
        })
    }

    get search(): string{
       return this._search;
    }

    setSearch(newSearch: string){
        this._search = newSearch;
    }

}
export default new SearchStore();