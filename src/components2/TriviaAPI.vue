<script>
export default {
    data(){
        return{
            questionData: null,
            index: this.questionIndex, 
            question: null,
        }
    },
    methods:{
        async fetchData(){
            let response = await fetch ('https://opentdb.com/api.php?amount=10');
            let data = await response.json();

            return data.results;
        },
        Question(){
            this.question = this.questionData[this.index].question
        }
    },
    async mounted(){
        this.questionData = await this.fetchData();
        this.Question();
    },



    props:{
        questionIndex: Number,
        category: String,
    }

 }


</script>

<template>
    <div>
        
    </div>
</template>