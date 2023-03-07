<template>
    <div class="trivia-results">
        <div class="questions-category">
            <p>{{ questionsCategory }}</p>
        </div>
        <div class="questions" v-for="(questions, questionsIndex) in questionsObject" :key="questionsIndex" :class="{ 'correct-answer': checkIfQuestionsIsCorrect(questionsIndex) === 'correct', 'wrong-answer': checkIfQuestionsIsCorrect(questionsIndex) === 'wrong', 'not-answered': checkIfQuestionsIsCorrect(questionsIndex) === 'notAnswered'}">
            <div class="question-state" >
                <Correct v-if="checkIfQuestionsIsCorrect(questionsIndex) === 'correct'"/>
                <NotAnswered v-else-if="checkIfQuestionsIsCorrect(questionsIndex) === 'notAnswered'"/>
                <Wrong v-else-if="checkIfQuestionsIsCorrect(questionsIndex) === 'wrong'"/>
            </div>
            <p>{{ decodeEntities(questionsObject[questionsIndex].question) }}</p>

            <div class="questions-answers">
                
            </div> 
        </div>
    </div>
</template>
  
<script setup>
import Wrong from '../components/icons/Wrong.vue'
import Correct from '../components/icons/Check.vue'
import NotAnswered from '../components/icons/QuestionMark.vue'
import ChevronDown from '../components/icons/ChevronDown.vue'
</script>

<script>
export default {
    props:{
        questionsObject: Object,
        allQuestionsAnswers: Array,
        correctAnswers: Array,
        questionsAnswered: Array,
        questionsCategory: String,
    },
    
    methods:{
        decodeEntities(text) {
            const el = document.createElement('textarea');
            el.innerHTML = text;
            return el.value;
        },
        checkIfQuestionsIsCorrect(currentQuestionIndex){
            if (this.questionsAnswered[currentQuestionIndex] === this.correctAnswers[currentQuestionIndex]){
                return 'correct'
            }
            else if (this.questionsAnswered[currentQuestionIndex] === 'this question is not answered'){
                return 'notAnswered';
            } 
            else{
                return 'wrong';
            }
        },
    } 
}
</script>

<style scoped>
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

.chevron-down-button{
    width: 30px;
    height: 30px;

    position: absolute;
    top: 50%;
    right: 1.5%;
    transform: translateY(-50%);
}
.chevron-down-button > svg{
    width: 22px;
    height: 22px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    stroke: #3A3A3A;
    stroke-width: 3px;
}
.chevron-down-button:hover{
    cursor : pointer;
    opacity: 0.5;
    transition: 100ms ease;
}
.chevron-down-button:active{
    opacity: 1;
    transition: 100ms ease;
}
.correct-answer > .chevron-down-button > svg{
    stroke: white;
    stroke-width: 3px;
}
.wrong-answer > .chevron-down-button > svg{
    stroke: #ED4956;
    stroke-width: 3px;
}
.not-answered > .chevron-down-button > svg{
    stroke: #8B8B8B;
    stroke-width: 3px;
}

.questions-answers{

}
.questions-answers > p{

}
</style>