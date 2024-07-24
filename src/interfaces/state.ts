import { ITenant } from '@/types/tenant';
import {IUser} from '@/types/user';

export interface IAuthState {
    currentUser?: IUser | null;
}

export interface IAuthModule {
    namespaced: boolean;
    state: IAuthState;
    mutations: any;
    actions: any;
    getters: any;
}

export interface ITenantModule {
    namespaced: boolean;
    state: ITenantState;
    mutations: any;
    actions: any;
    getters: any;
}

export interface ITenantState {
    tenant?: ITenant | null;
}
