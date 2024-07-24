import {Component, Vue} from 'vue-facing-decorator';

import Input from '@/components/input/input.vue';
import {useToast} from 'vue-toastification';
import {Button, Checkbox, Image} from '@profabric/vue-components';
import {authUser, loginWithEmail} from '@/services/auth';
import Auth from '@/utilities/auth';

@Component({
    components: {
        'app-input': Input,
        'pf-checkbox': Checkbox,
        'pf-button': Button,
        'pf-image': Image
    }
})
export default class Login extends Vue {
    private appElement: HTMLElement | null = null;
    public email: string = '';
    public password: string = '';
    public rememberMe: boolean = false;
    public isAuthLoading: boolean = false;
    public isGoogleLoading: boolean = false;
    public isFacebookLoading: boolean = false;
    private toast = useToast();

    public mounted(): void {
        this.appElement = document.getElementById('app') as HTMLElement;
        this.appElement.classList.add('login-page');
    }

    public unmounted(): void {
        (this.appElement as HTMLElement).classList.remove('login-page');
    }

    public async loginByAuth(): Promise<void> {
        try {
            this.isAuthLoading = true;
            const user = await loginWithEmail(this.email, this.password);
            localStorage.setItem('user', JSON.stringify(user.data));
            this.$store.dispatch('auth/setCurrentUser', user.data);
            this.toast.success('Login succeeded');
            Auth.initialize();

            let res = await authUser();
            let tenant = res.data.data['user '].tenant;
            console.log(res);
            localStorage.setItem('tenant', JSON.stringify(tenant));
            this.$store.dispatch('tenant/setTenant', tenant);

            this.isAuthLoading = false;
            this.$router.replace('/');
        } catch (error: any) {
            console.log(error);
            this.toast.error(error.response.data.message);
            this.isAuthLoading = false;
        }
    }

    public async loginByFacebook(): Promise<void> {
        try {
            this.isFacebookLoading = true;
            throw new Error('Not implemented');
        } catch (error: any) {
            this.toast.error(error.message);
            this.isFacebookLoading = false;
        }
    }
}
