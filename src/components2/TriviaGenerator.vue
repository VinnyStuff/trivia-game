<script setup> //um bom nome para esse script tambem seria TriviaController
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
            correctAnswers: [],
            amoutCorrectAnswered: null,
            countdownValueStart: 3,
        }
    },
    methods:{
        async fetchData(){
            let response = await fetch ('https://opentdb.com/api.php?amount=10');
            let data = await response.json();
            
            console.log(data.results)
            return data.results;
        },
        shuffleAnswers(index){
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
                //console.log(answerIndex);
                
                this.correctAnswers.push(this.questionData[this.questionIndex].correct_answer);
                this.questionsAnswers.push(this.currentQuestionAnswers[answerIndex]);


                //console.log(this.questionsAnswers + "essa foi a alternativa escolhida");
                //console.log(this.correctAnswers + "essa é a alternativa correta");


                this.currentQuestionAnswers = this.shuffleAnswers(this.questionIndex + 1)
                this.questionIndex++;
            }
            else if(this.questionIndex === this.questionData.length - 1){
                this.correctAnswers.push(this.questionData[this.questionIndex].correct_answer);
                this.questionsAnswers.push(this.currentQuestionAnswers[answerIndex]);

                if(this.amoutCorrectAnswered === null){
                    const correctAnswersArray = this.correctAnswers;
                    const questionAnswersArray = this.questionsAnswers;

                    console.log(correctAnswersArray);
                    console.log(questionAnswersArray);

                    let totalCorrectAnswers = 0;

                    for (let i = 0; i < this.questionData.length; i++) {
                        //console.log(i);
                        if(correctAnswersArray[i] === questionAnswersArray[i]){
                            //this.amoutCorrectAnswered++;
                            totalCorrectAnswers++;
                            console.log("a " + i +"°" + " questão está correta.");
                        }
                    }
                    this.amoutCorrectAnswered = totalCorrectAnswers;
                    console.log( "Você acertou no total " + totalCorrectAnswers+ " perguntas.");
                }
            }
        },
    },
    async mounted(){
        this.questionData = await this.fetchData();
        this.currentQuestionAnswers = this.shuffleAnswers(this.questionIndex);
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
        :totalCorrectAnswers="amoutCorrectAnswered"
        :initialCountdownValue="countdownValueStart"
        @trivia-click="nextQuestion($event)" 
        />
        <!-- answers have decodeEntities() when suffle the answers-->
    </div>
</template>