import {Component, Vue} from 'vue-facing-decorator';
import Input from '@/components/input/input.vue';
import {useToast} from 'vue-toastification';
import {Button, Checkbox, Image} from '@profabric/vue-components';
import {setPassword, verifyEmail} from '@/services/auth';
import {getSupportedBanks} from '@/services/bank';
import Error from '@/components/Error.vue';
// import {registerWithEmail} from '@/services/auth';

@Component({
    components: {
        'app-input': Input,
        'pf-checkbox': Checkbox,
        'pf-button': Button,
        'pf-image': Image,
        'app-error': Error
    }
})
export default class VerifyMail extends Vue {
    private appElement: HTMLElement | null = null;
    verified = false;
    public password: string = '';
    public errorMsg: string = '';
    public confirmPassword: string = '';

    public token: any = '';

    public isAuthLoading: boolean = false;
    public loading: boolean = false;

    private toast = useToast();

    public mounted(): void {
        this.appElement = document.getElementById('app') as HTMLElement;
        this.appElement.classList.add('register-page');
    }

    public beforeMount() {
        this.verifyEmail();
    }

    public unmounted(): void {
        (this.appElement as HTMLElement).classList.remove('register-page');
    }

    // public async registerByAuth(): Promise<void> {
    //     try {
    //         this.isAuthLoading = true;
    //         const {user} = await registerWithEmail(this.email, this.password);
    //         this.$store.dispatch('auth/setCurrentUser', user);
    //         this.toast.success('Register succeeded');
    //         this.isAuthLoading = false;
    //         this.$router.replace('/');
    //     } catch (error: any) {
    //         this.toast.error(error.message);
    //         this.isAuthLoading = false;
    //     }
    // }

    // public async registerByGoogle(): Promise<void> {
    //     try {
    //         this.isGoogleLoading = true;
    //         const {user} = await signInByGoogle();
    //         this.$store.dispatch('auth/setCurrentUser', user);
    //         this.toast.success('Login succeeded');
    //         this.isGoogleLoading = false;
    //         this.$router.replace('/');
    //     } catch (error: any) {
    //         this.toast.error(error.message);
    //         this.isGoogleLoading = false;
    //     }
    // }

    public async verifyEmail(): Promise<void> {
        try {
            this.isAuthLoading = true;
            console.log(this.$route.query);
            this.token = this.$route.query;
            const res = await verifyEmail(this.token.token);
            console.log(res);
            this.verified = true;
        } catch (error: any) {
            if (error.code === 500) {
                this.toast.error(error.message);
                this.errorMsg = error.message;
            } else {
                console.log(error.response.data);
                this.errorMsg = error.response.data.message;
            }
            this.isAuthLoading = false;
        } finally {
            this.isAuthLoading = false;
        }
    }

    public async setPassword() {
        try {
            this.loading = true;
            console.log(this.$route.query);
            this.token = this.$route.query;
            const res = await setPassword(
                this.password,
                this.confirmPassword,
                this.token.token
            );
            console.log(res);
            this.toast.success('Password set successfully');
            this.$router.push('/login');
        } catch (error: any) {
            console.log(error.response);
            this.toast.error(error.response.message);
        } finally {
            this.loading = false;
        }
    }

    // public async getBanks() {
    //     try {
    //         this.isAuthLoading = true;
    //         let res = await getSupportedBanks();
    //         console.log(res);
    //     } catch (error) {}
    // }
}
