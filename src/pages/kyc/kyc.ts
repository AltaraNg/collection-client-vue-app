import {Component, Vue, toNative} from 'vue-facing-decorator';
import {get} from '@/utilities/api';
import {useToast} from 'vue-toastification';
import Loading from '@/components/Loading.vue';
import Pagination from '@/components/Pagination.vue';
import Input from '@/components/input/input.vue';
import {Button} from '@profabric/vue-components';
import queryParam from '@/utilities/queryParams';
import ZeroState from '@/pages/ZeroState.vue';
import {
    getSupportedBanks,
    submitKycDetails,
    verifyBankDetails
} from '@/services/bank';
// @ts-ignore
import Autocomplete from '@trevoreyre/autocomplete-vue';
import '@trevoreyre/autocomplete-vue/dist/style.css';
import {authUser} from '@/services/auth';

@Component({
    components: {
        'app-input': Input,
        'app-loading': Loading,
        'pagination-component': Pagination,
        'pf-button': Button,
        'zero-state': ZeroState,
        'auto-complete': Autocomplete
    }
})
class KYC extends Vue {
    private toast = useToast();
    public customerList: any = '';
    public loading: boolean = true;
    public accountNumber: any = '';
    public kycLoading: boolean = false;
    public accountName: any = null;
    public bvn: any = null;

    public telephone: string = '';
    selectedBank: any = '';
    public firstName: string = '';
    public lastName: string = '';
    public isAuthLoading: boolean = false;
    public isResetLoading: boolean = false;
    public custom_customer_id: string = '';
    public banks: any = '';

    public async getBanks() {
        try {
            this.loading = true;
            let res = await getSupportedBanks();
            this.banks = res.data.data.banks;
        } catch (error) {
        } finally {
            this.loading = false;
        }
    }

    public async verifyBank() {
        try {
            this.isAuthLoading = true;
            let res = await verifyBankDetails(
                this.accountNumber,
                this.selectedBank.id
            );
            this.accountName = res.data.data.account_name;
        } catch (error) {
        } finally {
            this.isAuthLoading = false;
        }
    }

    mounted() {
        this.getBanks();
    }

    search(input: any) {
        if (input.length < 1) {
            return [];
        }
        return this.banks.filter((bank: any) => {
            return bank.name.toLowerCase().startsWith(input.toLowerCase());
        });
    }

    getResultValue(result: any) {
        return result.name;
    }
    getAccountInput(res: any) {
        this.selectedBank = res;
    }
    async submitKyc() {
        try {
            this.kycLoading = true;
            let data = {
                account_number: this.accountNumber,
                account_name: this.accountName,
                bvn: this.bvn,
                bank_id: this.selectedBank.id,
                first_name: this.firstName,
                last_name: this.lastName,
                phone: this.telephone
            };
            let res = await submitKycDetails(data);
            this.toast.success('Submitted successfully')
            let ano = await authUser();
            let tenant = ano.data.data['user '].tenant;
            localStorage.setItem('tenant', JSON.stringify(tenant));
            this.$store.dispatch('tenant/setTenant', tenant);
            this.$router.push('/');
        } catch (error) {
        } finally {
            this.kycLoading = false;
        }
    }

    get tenantBankInfo() {
        return this.$store.getters['tenant/tenant'];
    }
}
export default toNative(KYC);
