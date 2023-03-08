<template>
    <div class="trivia-results">
        <div class="results" v-if="showTriviaDialog === false">
            <div class="questions-category">
                <p>put something</p>
            </div>
            <div class="questions" v-for="(questions, questionsIndex) in questionsObject" :key="questionsIndex" :class="{ 'correct-answer': checkIfQuestionsIsCorrect(questionsIndex) === 'correct', 'wrong-answer': checkIfQuestionsIsCorrect(questionsIndex) === 'wrong', 'not-answered': checkIfQuestionsIsCorrect(questionsIndex) === 'notAnswered'}">
                <div class="question-state" >
                    <Correct v-if="checkIfQuestionsIsCorrect(questionsIndex) === 'correct'"/>
                    <NotAnswered v-else-if="checkIfQuestionsIsCorrect(questionsIndex) === 'notAnswered'"/>
                    <Wrong v-else-if="checkIfQuestionsIsCorrect(questionsIndex) === 'wrong'"/>
                </div>
                <p>{{ decodeEntities(questionsObject[questionsIndex].question) }}</p>
                <div class="chevron-container" @click="showTriviaDialog = true, currentDialogQuestionIndex = questionsIndex">
                    <v-tooltip activator="parent" location="bottom">See the question</v-tooltip>
                    <ChevronRight class="chevron-right"/>
                </div>
            </div>
        </div>
        <div class="trivia-dialog" v-else>
            <TriviaDialog
                @back-click="showTriviaDialog = false" 
                :index="currentDialogQuestionIndex"
                :amountQuestions="questionsObject.length"
                :question="decodeEntities(questionsObject[currentDialogQuestionIndex].question)"
                :category="decodeEntities(questionsObject[currentDialogQuestionIndex].category)"
                :answers="allQuestionsAnswers"
                :correctAnswer="correctAnswers"
                :questionsAnswered="questionsAnswered"
            />
        </div>
    </div>
</template>
  
<script setup>
import Wrong from '../components/icons/Wrong.vue'
import Correct from '../components/icons/Check.vue'
import NotAnswered from '../components/icons/QuestionMark.vue'
import ChevronRight from '../components/icons/ChevronRight.vue'

import TriviaDialog from './TriviaResultsDialog.vue'
</script>

<script>
export default {
    props:{
        questionsObject: Object,
        allQuestionsAnswers: Array,
        correctAnswers: Array,
        questionsAnswered: Array,
    },
    data(){
        return{
            showTriviaDialog: false,
            currentDialogQuestionIndex: 0,
        }
    },
    methods:{
        decodeEntities(text) {
            const el = document.createElement('textarea');
            el.innerHTML = text;
            return el.value;
        },
        checkIfQuestionsIsCorrect(currentQuestionIndex){
            if (this.questionsAnswered[currentQuestionIndex] === this.correctAnswers[currentQuestionIndex]){
                return 'correct';
            }
            else if (this.questionsAnswered[currentQuestionIndex] === 'this question is not answered'){
                return 'notAnswered';
            } 
            else{
                return 'wrong';
            }
        },
    },
    mounted(){
        console.log(this.correctAnswers);
        console.log(this.questionsAnswered);
    }
}
</script>

<style scoped>
@keyframes showDialog{
    0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
.trivia-dialog{
    animation: showDialog 0.25s ease forwards;
}
.results{
    animation: showDialog 0.25s ease forwards;
}

p{
    font-size: 18px;
    text-align: justify;
    margin: 0px 30px;
    line-height: 22px;
    color: #3A3A3A;
}
.questions-category > p{
    margin: 0px 0px;
    text-align: center;
}
.questions , .questions-category{
    width: 100%;
    height: max-content;
    font-size: 20px;
    border-radius: 35px;
    font-weight: 600;
    border: 1.5px solid #D0D0D0;
    /* figma */

    /* Auto layout */
    display: flex;
    padding: 11px 12px;
    border-radius: 20px;

    position: relative;

    margin-bottom: 12px;
}
.questions-category{
    margin: 0 auto;
    margin-bottom: 12px;
    padding: 5px 20px;

    width: content;
    max-width: max-content;
}

.question-state{
    width: 22px;
    height: 22px;

    border: 2px solid black;
    border-radius: 100px;

    /* Inside auto layout */
    flex: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.question-state > svg{
    margin-bottom: 3px;
    height: 80%;
    width: 80%;
    border-radius: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.chevron-container{
    position: absolute;
    height: 26px;
    width: 26px;
    top: 50%;
    transform: translateY(-50%);

    right: 0;
    margin-right: 5px;
    cursor: pointer;
}
.chevron-container > .chevron-right{
    height: 100%;
    width: 100%;

    stroke: #9A9A9A;
}

.correct-answer{
    background-color: #70C050;
}
.correct-answer > .question-state{
    background-color: white;
    border: 2px solid white;
}
.correct-answer > .question-state > svg{
    fill: #70C050;
}
.correct-answer > .question-state > svg {
  stroke: #70C050;
  stroke-width: 2px;
}
.correct-answer > p{
    color: white;
}
.correct-answer > .chevron-container > .chevron-right{
    stroke: white;
}

.wrong-answer > .question-state{
    border: 2px solid #ED4956;
}
.wrong-answer > .question-state > svg{
    fill: #ED4956;
}

.not-answered > .question-state{
    border: 2px solid #8B8B8B;
}
.not-answered > .question-state > svg{
    fill: #8B8B8B;
}
</style>