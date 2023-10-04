import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {Meta} from "utils/meta";
import axios from "axios";
import {normalizeUser, UserApi, UserModel} from "../../models/users/User";

const REACT_APP_URL: string = 'https://api.escuelajs.co/api/v1';

type PrivateFields = '_authUser' | '_token' | '_meta';
type Token = {
    access_token: string,
}
export default class AuthStore{
    private _authUser: UserModel | null = null;

    private _token: Token | any = localStorage.getItem('token') ? localStorage.getItem('token') : null;
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<AuthStore, PrivateFields>(this, {
            _authUser: observable,
            _token: observable,
            _meta: observable,

            authUser: computed,
            token: computed,

            login: action,
            authorization: action,
            logout: action
        })
    }

    get authUser(){
        return this._authUser;
    }

    get token(){
        return this._token;
    }

    async login(values: any){
        this._meta = Meta.loading;

        const response = await axios.post<Token | any>(`${REACT_APP_URL}/auth/login/`, {
            'email': values.email,
            'password': values.password
        })

        runInAction(() => {
            if (response.status === 201) {
                try {
                    this._meta = Meta.success;
                    localStorage.setItem('token', response.data.access_token);
                    this.authorization();
                    return;
                } catch {
                    this._meta = Meta.error;
                }
            }
            this._meta = Meta.error;
        })
    }

    async authorization(){
        this._meta = Meta.loading;

        const response = await axios.get<UserApi>(`${REACT_APP_URL}/auth/profile`, {
            headers: {"Authorization": `Bearer ${this._token}`}
        })

        runInAction(() => {
            if (response.status === 200) {
                try {
                    this._meta = Meta.success;
                    this._authUser = normalizeUser(response.data);

                    return;
                } catch {
                    this._meta = Meta.error;
                }
            }
            this._meta = Meta.error;
        })
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('cart');
        this._authUser = null;
    }

}