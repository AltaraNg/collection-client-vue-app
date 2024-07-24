import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import {IAuthModule} from '@/interfaces/state';

let user = localStorage.getItem('user');

const authModule: IAuthModule = {
    namespaced: true,
    state: {
        currentUser: JSON.parse(user) ?? undefined
    },
    mutations,
    actions,
    getters
};

export default authModule;
