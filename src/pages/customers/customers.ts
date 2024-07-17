import {Component, Vue, toNative} from 'vue-facing-decorator';
import {get} from '@/utilities/api';
import {useToast} from 'vue-toastification';
import Loading from '@/components/Loading.vue';
import Pagination from '@/components/Pagination.vue';
import Input from '@/components/input/input.vue';
import {Button} from '@profabric/vue-components';
import queryParam from '@/utilities/queryParams';

@Component({
    components: {
        'app-input': Input,
        'app-loading': Loading,
        'pagination-component': Pagination,
        'pf-button': Button
    }
})
class Customers extends Vue {
    private toast = useToast();
    public customerList: any;
    public loading: boolean = true;
    public per_page: number = 10;
    public telephone: string = '';
    public name: string = '';
    public isAuthLoading: boolean = false;
    public isResetLoading: boolean = false;
    public custom_customer_id: string = '';
    OId: number = 1;
    async fetchCustomers() {
        let query = this.$route.query;
        query.per_page = this.per_page.toString();
        try {
            let res = await get(`/api/client/customers` + queryParam(query));
            this.customerList = res.data.data.customers;
            this.toast.success('Customers fetched successfully');
        } catch (error: any) {
            this.toast.error(error.message);
        } finally {
            this.loading = false;
        }
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
                this.customerList = res.data.data.customers;
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
            name?: string;
            telephone?: string;
            per_page?: number;
            custom_customer_id?: string;
        } = {};
        if (this.telephone) query.telephone = this.telephone;
        if (this.name) query.name = this.name;
        if (this.per_page) query.per_page = this.per_page;
        if (this.custom_customer_id)
            query.custom_customer_id = this.custom_customer_id;

        this.isAuthLoading = true;

        try {
            let res = await get(`/api/client/customers` + queryParam(query));
            this.customerList = res.data.data.customers;
            this.$router.replace(this.$route.path + queryParam(query));
            this.toast.success('Customers fetched successfully');
        } catch (error: any) {
            this.toast.error(error.message);
        } finally {
            this.isAuthLoading = false;
        }
    }

    async reset() {
        this.isResetLoading = true;
        this.per_page = 10;
        await this.fetchCustomers();
        this.$router.replace(this.$route.path);
        this.isResetLoading = false;
    }

    mounted() {
        this.fetchCustomers();
    }
}
export default toNative(Customers);
