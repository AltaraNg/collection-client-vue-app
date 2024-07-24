import {ITenant} from '@/types/tenant';

export default {
    setTenant: (context: any, payload: ITenant): void => {
        context.commit('setTenant', payload);
    }
};
