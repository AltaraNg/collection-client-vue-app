import {Component, Vue} from 'vue-facing-decorator';
import {DateTime} from 'luxon';
import {Dropdown, Image} from '@profabric/vue-components';

@Component({
    name: 'user-dropdown',
    components: {
        'pf-dropdown': Dropdown,
        'pf-image': Image
    }
})
export default class User extends Vue {
    get authentication(): any {
        return this.$store.getters['auth/currentUser'];
    }

    async logout() {
        try {
            localStorage.removeItem('user');
            localStorage.removeItem('tenant');

            this.$store.dispatch('auth/setCurrentUser', undefined);
            this.$store.dispatch('tenant/setTenant', undefined);

            this.$router.replace('/login');
        } catch (error) {
            console.log(error);
        }
    }

    get readableCreatedAtDate() {
        if (
            this.authentication &&
            this.authentication.metadata &&
            this.authentication.metadata.createdAt
        ) {
            return DateTime.fromMillis(
                +this.authentication.metadata.createdAt
            ).toFormat('dd LLLL yyyy');
        }
        return '';
    }
}
