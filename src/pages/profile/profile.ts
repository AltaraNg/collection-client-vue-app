import {Button, Image} from '@profabric/vue-components';
import {Component, Vue} from 'vue-facing-decorator';

@Component({
    name: 'app-profile',
    components: {
        'pf-image': Image,
        'pf-button': Button
    }
})
export default class Profile extends Vue {
    private activeTab = 'SETTINGS';

    private setActiveTab(tab: string): void {
        this.activeTab = tab;
    }

    get tenantBankInfo() {
        return this.$store.getters['tenant/tenant'];
    }
}
