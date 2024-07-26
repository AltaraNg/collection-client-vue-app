import Loading from '@/components/Loading.vue';
import {fetchStats} from '@/services/auth';
import {formatCurrency} from '@/utilities/globalFunctions';
import {Component, toNative, Vue} from 'vue-facing-decorator';

@Component({
    components: {
        'app-loading': Loading
    }
})
class Dashboard extends Vue {
    public loading = false;
    public stats: any = null;
    get tenantBankInfo() {
        return this.$store.getters['tenant/tenant'];
    }

    async getStats() {
        this.loading = true;
        try {
            console.log('got here');
            let res = await fetchStats();
            console.log(res.data);
            this.stats = res.data.data;
        } catch (error) {
            console.log(error);
        } finally {
            this.loading = false;
        }
    }

    mounted() {
        this.getStats();
    }
    get amountOwed() {
        return formatCurrency(this.stats.totalAmountOwed);
    }

    get amountCollected() {
        return formatCurrency(this.stats.totalAmountCollected);
    }
}

export default toNative(Dashboard);
