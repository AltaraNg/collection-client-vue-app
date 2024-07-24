import {IAuthState, ITenantState} from '@/interfaces/state';
import {ITenant} from '@/types/tenant';
import {IUser} from '@/types/user';

export default {
    setTenant: (state: ITenantState, payload: ITenant): void => {
        state.tenant = payload;
    }
};
