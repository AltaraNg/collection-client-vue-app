<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="error-template">
                    <h3>
                        Oops!</h3>

                    <div class="error-details my-2 text-capitalize">
                        {{ msg }}
                    </div>
                    <div class="error-actions">
                        <a href="/" class="btn btn-primary btn-lg"><span class="glyphicon glyphicon-home"></span>
                            Take Me Home </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Spinner } from "@profabric/vue-components";
import { Vue, Component, Prop } from "vue-facing-decorator";

@Component(
    {
        components: {
            'pf-spinner': Spinner
        }

    }

)
export default class Error extends Vue {
    @Prop({
        required: true
    }) msg: any;
}
</script>