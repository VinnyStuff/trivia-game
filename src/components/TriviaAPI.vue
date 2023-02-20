<script>
import ApiData  from './Trivia.vue'

export default {
    data(){
        return{
            myData: null,
        }
    },
    methods:{
        async fetchData(){
            let response = await fetch ('https://opentdb.com/api.php?amount=10');
            let data = await response.json();

            return data.results;
        },
    },
    async mounted(){
        this.myData = await this.fetchData();
    },
    components:{
        ApiData,
    }
 }


</script>

<template>
    <div>
        <api-data v-if="myData" :ApiData="myData" :key="myData"></api-data>
    </div>
</template>

