import {calculateWindowSize} from '@/utils/helpers';
import {Component, Vue, Watch} from 'vue-facing-decorator';
import {useWindowSize} from '@vueuse/core';
import Auth from '@/utilities/auth'

import {IUser} from '@/interfaces/user';

@Component({})
export default class App extends Vue {
    isAppLoading: boolean = true;

    async mounted() {
        await this.checkSession();
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
        if(user){
            this.$store.dispatch('auth/setCurrentUser', JSON.parse(user))
        }
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
}
