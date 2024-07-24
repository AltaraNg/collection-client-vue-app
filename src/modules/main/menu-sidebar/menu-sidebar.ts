import {Component, Vue} from 'vue-facing-decorator';
import MenuItem from '@/components/menu-item/menu-item.vue';
import {Image} from '@profabric/vue-components';
import SidebarSearch from '@/components/sidebar-search/sidebar-search.vue';
import {i18n} from '@/translation';
import {IUser} from '@/types/user';
import {toRaw} from 'vue';

@Component({
    name: 'app-menu-sidebar',
    components: {
        'app-menu-item': MenuItem,
        'app-sidebar-search': SidebarSearch,
        'pf-image': Image
    }
})
export default class MenuSidebar extends Vue {
    menu = MENU;

    get currentUser(): IUser | undefined {
        const user = this.$store.getters['auth/currentUser'];
        return user;
    }

    get sidebarSkin() {
        return this.$store.getters['ui/sidebarSkin'];
    }
}

export const MENU = [
    {
        iconClass: 'nav-icon fas fa-tachometer-alt',
        name: i18n.global.t('labels.dashboard'),
        path: '/'
    },
    {
        iconClass: 'nav-icon fas fa-users',
        name: i18n.global.t('labels.customers'),
        path: '/customers'
    },
    {
        iconClass: 'nav-icon fas fa-landmark',
        name: i18n.global.t('labels.orders'),
        path: '/orders'
    },

    {
        iconClass: 'nav-icon fas fa-money-bill-wave-alt',
        name: 'Wallet',
        path: '/wallet'
    },

    {
        iconClass: 'nav-icon fas fa-shield-alt',
        name: 'KYC',
        path: '/kyc'
    }
];
