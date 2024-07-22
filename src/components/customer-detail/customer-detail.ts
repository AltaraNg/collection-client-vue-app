import {Component, Prop, Vue} from 'vue-facing-decorator';

@Component({
    name: 'customer-detail'
})
export default class Input extends Vue {
    @Prop() customer: object;
}
