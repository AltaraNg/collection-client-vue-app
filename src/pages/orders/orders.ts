import {Component, Vue, toNative} from 'vue-facing-decorator';
import {get} from '@/utilities/api';
import {useToast} from 'vue-toastification';
import Loading from '@/components/Loading.vue';
import Pagination from '@/components/Pagination.vue';
import Input from '@/components/input/input.vue';
import {Button} from '@profabric/vue-components';
import queryParam from '@/utilities/queryParams';
import ZeroState from '@/pages/ZeroState.vue';
import {formatCurrency} from '@/utilities/globalFunctions';

@Component({
    components: {
        'app-input': Input,
        'app-loading': Loading,
        'pagination-component': Pagination,
        'pf-button': Button,
        'zero-state': ZeroState
    }
})
class Orders extends Vue {
    private toast = useToast();
    public customerList: any;
    public loading: boolean = true;
    public per_page: number = 10;
    public telephone: string = '';
    public name: string = '';
    public isAuthLoading: boolean = false;
    public isResetLoading: boolean = false;
    public custom_customer_id: string = '';
    public custom_order_number: string = '';
    public from_date: string = '';

    OId: number = 1;
    async fetchOrders() {
        let query = this.$route.query;
        query.per_page = this.per_page.toString();
        query.tenant = this.authentication.tenant.id;
        try {
            let res = await get(`/api/client/orders` + queryParam(query));
            this.customerList = res.data.data.orders;
            this.toast.success('Orders fetched successfully');
        } catch (error: any) {
            this.toast.error(error.message);
        } finally {
            this.loading = false;
        }
    }

    get authentication(): any {
        return this.$store.getters['auth/currentUser'];
    }

    async fetchNext(item: any) {
        if (item) {
            this.loading = true;
            let queryString = '?' + item.url.split('?')[1];
            let urlParams = new URLSearchParams(queryString);
            let query = this.$route.query;
            query.per_page = this.per_page.toString();
            query.page = urlParams.get('page');
            console.log(query);
            try {
                let res = await get(
                    `/api/client/customers` + queryParam(query)
                );
                this.customerList = res.data.data.orders;
                this.$router.replace(this.$route.path + queryParam(query));

                this.OId = this.per_page * item.label - this.per_page + 1;

                this.toast.success('Customers fetched successfully');
            } catch (error: any) {
                this.toast.error(error.message);
            } finally {
                this.loading = false;
            }
        }
    }

    async filter() {
        let query: {
            from_date?: string;
            per_page?: number;
            custom_customer_id?: string;
            custom_order_number?: string;
        } = {};
        if (this.from_date) query.from_date = this.from_date;
        if (this.custom_customer_id)
            query.custom_customer_id = this.custom_customer_id;
        if (this.per_page) query.per_page = this.per_page;
        if (this.custom_order_number)
            query.custom_order_number = this.custom_order_number;

        this.isAuthLoading = true;

        try {
            let res = await get(`/api/client/orders` + queryParam(query));
            this.customerList = res.data.data.orders;
            this.$router.replace(this.$route.path + queryParam(query));
            this.toast.success('Orders fetched successfully');
        } catch (error: any) {
            this.toast.error(error.message);
        } finally {
            this.isAuthLoading = false;
        }
    }

    async reset() {
        this.isResetLoading = true;
        this.per_page = 10;
        await this.fetchOrders();
        this.$router.replace(this.$route.path);
        this.isResetLoading = false;
    }

    mounted() {
        this.fetchOrders();
    }

    formatCash(amount: any) {
        return formatCurrency(amount);
    }
}
export default toNative(Orders);
