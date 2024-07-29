<template>
    <div id="loaderContent">
        <div id="loader"></div>
        <p id="loaderText" class="text-center"> {{ msg }}.....</p>
    </div>
</template>

<script lang="ts">
var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 3000);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}
import { Spinner } from "@profabric/vue-components";
import { Vue, Component, Prop } from "vue-facing-decorator";

@Component(
    {
        components: {
            'pf-spinner': Spinner
        }
    }
)
export default class Loading extends Vue {
    @Prop({
        required: false,
        default: ''
    }) msg: any;
}
</script>

<style>
#loader {
    z-index: 1;
    width: 120px;
    height: 120px;
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
}

#loaderText {
    z-index: 1;
    text-align: center;
}

#loaderContent {
    display: flex;
    height: 100%;
    width: 100%;
    padding: 0;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0;
    z-index: 1;
}

@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>