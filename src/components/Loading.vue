<template>
    <div class="relative-position" style="height: 5em">
        <div class="absolute-center vertical-middle full-width column items-center">
            <pf-spinner type="grow" variant="primary"></pf-spinner>  
        </div>
    </div>
</template>

<script lang="ts">
import { Spinner } from "@profabric/vue-components";
import { Vue, Component } from "vue-facing-decorator";

@Component(
    {
    components: {
        'pf-spinner': Spinner
    }
}
)
export default class Loading extends Vue { }
</script> 