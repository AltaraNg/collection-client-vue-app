import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import {ITenantModule} from '@/interfaces/state';

let tenant = localStorage.getItem('tenant');

const tenantModule: ITenantModule = {
    namespaced: true,
    state: {
        tenant: JSON.parse(tenant) ?? undefined
    },
    mutations,
    actions,
    getters
};

export default tenantModule;
