<template>
    <div class="w-75 d-flex mx-auto text-center mb-4" v-if="paginationData.total > paginationData.per_page">
        <span>{{ }}</span>
        <span v-for="item in paginationData.links" class="mx-1 pointer px-2 border"
            :class="{ 'active': item.active }" @click="linkClick(item)">
            <div v-if="item.url !== null" class="text-bold" :class="{ 'active': item.active }"
                v-html="item.label"></div>
        </span>

    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-facing-decorator";

@Component({
    name: 'Pagination',
    emits: ["fetchNext"]
})


export default class Pagination extends Vue {
    @Prop({
        required: true
    }) paginationData: any;

    @Emit('fetchNext')
    linkClick(item: any) {
        if(item.active || item.url === null ){
            return
        }
        return item
    }
}
</script>

<style lang="scss">
.active {
    color: orange;
}

.pointer {
    cursor: pointer;
}

</style>