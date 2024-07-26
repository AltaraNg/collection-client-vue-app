import {calculateWindowSize} from '@/utils/helpers';
import {Component, Vue, Watch} from 'vue-facing-decorator';
import {useWindowSize} from '@vueuse/core';
import Auth from '@/utilities/auth';
import _ from 'lodash';

import {IUser} from '@/interfaces/user';
import {interceptors} from '@/utilities/api';
import {useToast} from 'vue-toastification';
import axios from 'axios';

@Component({})
export default class App extends Vue {
    isAppLoading: boolean = true;
    private toast = useToast();

    async mounted() {
        await this.checkSession();
        axios.interceptors.request.use(
            (config) => {
                this.debouncer();
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        ),
            axios.interceptors.response.use(
                (config) => {
                    return config;
                },
                (error) => {
                    if (
                        error.response.data.error_message === 'Unauthenticated.'
                    ) {
                        this.bounceUser();
                    }
                    return Promise.reject(error);
                }
            );
    }
    async beforeCreate() {
        Auth.initialize();
    }

    get authentication(): IUser {
        return this.$store.getters['auth/currentUser'];
    }

    async checkSession() {
        this.isAppLoading = false;
        let user = localStorage.getItem('user');
        console.log(user);
        // if (user) {
        //     this.$store.dispatch('auth/setCurrentUser', JSON.parse(user));
        // } else {
        //     this.$router.push('/login');
        // }
        // let storedAuthentication = this.$store.getters['auth/currentUser'];

        // onAuthStateChanged(
        //     firebaseAuth,
        //     (user) => {
        //         if (user) {
        //             this.$store.dispatch('auth/setCurrentUser', user);
        //         } else {
        //             this.$store.dispatch('auth/setCurrentUser', undefined);
        //         }
        //         this.isAppLoading = false;
        //     },
        //     (e) => {
        //         console.log(e);
        //         this.$store.dispatch('auth/setCurrentUser', undefined);
        //         this.isAppLoading = false;
        //     }
        // );
    }

    @Watch('windowSize')
    watchWindowSize(newValue: any) {
        if (this.$store.getters['ui/screenSize'] !== newValue) {
            this.$store.dispatch('ui/setWindowSize', newValue);
        }
    }

    get windowSize() {
        const {width} = useWindowSize();
        return calculateWindowSize(width.value);
    }
    bounceUser() {
        Auth.remove();
        this.$router.push('/login');
    }

    debouncer() {
        _.debounce(
            () => {
                this.bounceUser();
            },
            30 * 60 * 1000
        );
    }

    created() {
        interceptors((err: any) => {
            if (err.response.status === 401) {
                Auth.remove();
                this.$store.dispatch('auth/setCurrentUser', undefined);
                this.$store.dispatch('tenant/setTenant', undefined);
                this.$router.push('/login');
            }
            if (err.response.status === 500)
                this.toast.error(err.response.statusText);
            if (err.response.status === 404) this.$router.push('/not-found');
        });
    }
}
