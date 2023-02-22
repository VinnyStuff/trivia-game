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
            amoutNotAnswered: null,
            countdownValueStart: 30,
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

                if(typeof answerIndex === 'number'){
                    this.questionsAnswers.push(this.currentQuestionAnswers[answerIndex]);
                }
                else if(typeof answerIndex === 'string'){
                    this.questionsAnswers.push(answerIndex);
                }

                this.correctAnswers.push(this.questionData[this.questionIndex].correct_answer);


                //console.log(this.questionsAnswers + "essa foi a alternativa escolhida");
                //console.log(this.correctAnswers + "essa é a alternativa correta");


                this.currentQuestionAnswers = this.shuffleAnswers(this.questionIndex + 1)
                this.questionIndex++;
            }
            else if(this.questionIndex === this.questionData.length - 1){

                if(typeof answerIndex === 'number'){
                    this.questionsAnswers.push(this.currentQuestionAnswers[answerIndex]);
                }
                else if(typeof answerIndex === 'string'){
                    this.questionsAnswers.push(answerIndex);
                }

                this.correctAnswers.push(this.questionData[this.questionIndex].correct_answer);

                if(this.amoutCorrectAnswered === null){
                    const correctAnswersArray = this.correctAnswers;
                    const questionAnswersArray = this.questionsAnswers;

                    console.log(correctAnswersArray);
                    console.log(questionAnswersArray);

                    let totalCorrectAnswers = 0;
                    let totalNotAnswered = 0;

                    for (let i = 0; i < this.questionData.length; i++) {
                        //console.log(i);
                        if(questionAnswersArray[i] === correctAnswersArray[i]){
                            //this.amoutCorrectAnswered++;
                            totalCorrectAnswers++;
                            console.log("a " + i +"°" + " questão está correta.");
                        }
                        else if(questionAnswersArray[i] === 'this question is not answered'){
                            totalNotAnswered++;
                            console.log("você não respondeu a questão " + i);
                        }
                    }
                    this.amoutCorrectAnswered = totalCorrectAnswers;
                    this.amoutNotAnswered = totalNotAnswered;
                    
                    console.log( "Você acertou no total " + totalCorrectAnswers+ " perguntas.");
                    console.log("você não respondeu " + totalNotAnswered + " questões");
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
        :totalNotAnswered="amoutNotAnswered"
        :initialCountdownValue="countdownValueStart"
        @trivia-click="nextQuestion($event)" 
        />
        <!-- answers have decodeEntities() when suffle the answers-->
    </div>
</template>