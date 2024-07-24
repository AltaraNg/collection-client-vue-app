import {Component, Vue} from 'vue-facing-decorator';

@Component({})
export default class Dashboard extends Vue {
    get tenantBankInfo() {
        return this.$store.getters['tenant/tenant'];
    }
}
