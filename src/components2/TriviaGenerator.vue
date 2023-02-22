<script setup>
import Trivia from './Trivia.vue'
</script>

<script>
export default {
    data(){
        return{
            questionData: null,
            questionIndex: 0,
            currentQuestionAnswers: [],
            questionsAnswers: [],
        }
    },
    methods:{
        async fetchData(){
            let response = await fetch ('https://opentdb.com/api.php?amount=10');
            let data = await response.json();
            
            //console.log(data.results)
            return data.results;
        },
        shuffledAnswers(index){
            if(this.questionData !== null){
                const correctAnswer = this.questionData[index].correct_answer;
                const incorrectAnswers = this.questionData[index].incorrect_answers;
                const answers = incorrectAnswers.concat(correctAnswer);
                //console.log(answers + "-  before shuffle - ");

                for (let i = answers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [answers[i], answers[j]] = [answers[j], answers[i]];}

                for (let i = 0; i < answers.length; i++) {
                    answers[i] = this.decodeEntities(answers[i]);
                }

                //console.log(answers + "- after shuffle -");
                return answers;
            } 
        },
        decodeEntities(text) {
            const el = document.createElement('textarea');
            el.innerHTML = text;
            return el.value;
        },
        nextQuestion(answerIndex){
            if(this.questionIndex < this.questionData.length - 1){
                console.log(answerIndex);
                this.questionsAnswers.push(this.currentQuestionAnswers[answerIndex]);
                console.log(this.questionsAnswers);


                this.currentQuestionAnswers = this.shuffledAnswers(this.questionIndex + 1)
                this.questionIndex++;
            }
        },
    },
    async mounted(){
        this.questionData = await this.fetchData();
        this.currentQuestionAnswers = this.shuffledAnswers(this.questionIndex);
    },
}
</script>

<template>
    <div>
        <Trivia
        v-if="questionData !== null"
        :index="questionIndex + 1"
        :question="decodeEntities(questionData[questionIndex].question)"
        :category="decodeEntities(questionData[questionIndex].category)"
        :answers="currentQuestionAnswers" 
        @trivia-click="nextQuestion($event)" 
        />
    </div>
</template>