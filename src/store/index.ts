import {createStore} from 'vuex';
import authModule from './auth';
import uiModule from './ui';
import tenantModule from './tenant';

export default createStore({
    modules: {
        auth: authModule,
        ui: uiModule,
        tenant: tenantModule
    }
});
