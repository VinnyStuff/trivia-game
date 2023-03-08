<template>
    <div class="trivia-controller" v-if="questionData !== null">
        <MainMenu class="main-menu" v-if="startedGame === false && gameEnds === false"
            :theme="decodeEntities(questionData[questionIndex].category)"
            @get-started-click="startedGame = true" 
        />

        <Trivia class="trivia-container"
            v-else-if="gameEnds === false && startedGame === true"
            :index="questionIndex"
            :question="decodeEntities(questionData[questionIndex].question)"
            :category="decodeEntities(questionData[questionIndex].category)"
            :amount-questions="questionData.length"
            :answers="currentQuestionAnswers" 
            :initialCountdownValue="countdownValueStart"
            :gameEnds="gameEnds"
            @trivia-click="nextQuestion($event)" 
        />       

        <TriviaResults class="trivia-results-container" v-else
            :questionsObject="questionData"
            :allQuestionsAnswers="allAnswers"
            :correctAnswers="correctAnswers"
            :questionsAnswered="questionsAnswered"
            :questionsCategory="decodeEntities(questionData[questionIndex].category)"
        />
    </div>
</template>


<script setup>
import Trivia from './Trivia.vue'
import TriviaResults from './TriviaResults.vue'
import MainMenu from './MainMenu.vue'
</script>

<script>
export default {
    data(){
        return{
            questionData: null, //question all informations
            questionIndex: 0, //current question
            currentQuestionAnswers: [], //current answers in current questions 
            countdownValueStart: 30, 
            startedGame: false,
            gameEnds: false, //when game ends

            //for triviaResults
            allAnswers: [],
            correctAnswers: [], // array of correct answers
            questionsAnswered: [], //array of all chosen answers
        }
    },
    methods:{
        async fetchData(){
            let response = await fetch ('https://opentdb.com/api.php?amount=10');
            let data = await response.json();
            
            console.log(data.results)
            return data.results;
        },
        async getApiData(){
            this.questionData = await this.fetchData();
            this.currentQuestionAnswers = this.shuffleAnswers(this.questionIndex);
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
                this.allAnswers.push(answers);
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
                    this.questionsAnswered.push(this.currentQuestionAnswers[answerIndex]);
                }
                else if(typeof answerIndex === 'string'){ //if not answered
                    this.questionsAnswered.push(answerIndex);
                }

                this.correctAnswers.push(this.questionData[this.questionIndex].correct_answer);


                //console.log(this.questionsAnswered + "essa foi a alternativa escolhida");
                //console.log(this.correctAnswers + "essa é a alternativa correta");


                this.currentQuestionAnswers = this.shuffleAnswers(this.questionIndex + 1)
                this.questionIndex++;
            }
            else if(this.questionIndex === this.questionData.length - 1){

                if(typeof answerIndex === 'number'){
                    this.questionsAnswered.push(this.currentQuestionAnswers[answerIndex]);
                }
                else if(typeof answerIndex === 'string'){ //if not answered
                    this.questionsAnswered.push(answerIndex);
                }

                this.correctAnswers.push(this.questionData[this.questionIndex].correct_answer);

                this.gameEnds = true;
            }
        },
    },
    async mounted(){
        this.getApiData();
    },
}
</script>

<style scoped>
.trivia-controller{
    margin: 12px 30px;
    max-width: 650px;
}
.trivia-controller > div{
    min-width: 100%;
    min-height: 900px;

    border-radius: 30px;
    background-color: white;
    position: relative;
    padding: 40px;

    -webkit-box-shadow: 0px 8px 26px -14px rgba(0,0,0,0.54); 
    box-shadow: 0px 8px 26px -14px rgba(0,0,0,0.54); 

    display: flex;
    flex-direction: column ;
}
@media only screen and (max-width: 700px) {
    .trivia-controller > div{
        padding: 6vw;
    }
}
@media only screen and (max-width: 510px) {
    .trivia-controller{
        margin: 12px 15px;
    }
}

.trivia-controller .main-menu{
    min-height: max-content;
}
</style>