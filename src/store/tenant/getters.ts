import {ITenantState} from '@/interfaces/state';
import { ITenant } from '@/types/tenant';

export default {
    tenant: (state: ITenantState): ITenant | undefined | null =>
        state.tenant
};
