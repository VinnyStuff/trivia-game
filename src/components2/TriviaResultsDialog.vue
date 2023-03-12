<template>
    <div class="trivia-dialog">
        <div class="question-index-container"> 
            <IconHelpCircle/> 
            <h3>{{ index + 1}}/{{ amountQuestions }}</h3>
        </div>
        <div class="back-container" @click="$emit('back-click')">
            <v-tooltip activator="parent" location="bottom">Back to results</v-tooltip>
            <ChevronRight class="back"/>
        </div>
        <div class="question-container">
            <h1>{{ question }}</h1>
        </div>
        <div class="category-container">
            <h3>{{ category }} ({{ questionDifficulty }})</h3>
        </div>
        <div class="answers-container">
            <div class="answer" 
            v-for="(answer, answersIndex) in answers[index]" :key="answersIndex" 
            :class="{
                'correct-answer-chosen':  applyStylesInAnswers(currentQuestionAnswers[answersIndex]) === 'correct answer chosen',
                'correct-answer-not-chosen': applyStylesInAnswers(currentQuestionAnswers[answersIndex]) === 'correct answer not chosen',
                'wrong-answer-chosen': applyStylesInAnswers(currentQuestionAnswers[answersIndex]) === 'wrong answer chosen'}">

                <div class="question-state">
                    <Correct class="correct"/>
                    <Wrong class="wrong"/>
                </div>
                <p>{{ currentQuestionAnswers[answersIndex] }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import IconHelpCircle from '../components/icons/IconHelpCircle.vue'
import Wrong from '../components/icons/Wrong.vue'
import Correct from '../components/icons/Check.vue'
import ChevronRight from '../components/icons/ChevronRight.vue'
</script>

<script>
export default {
    props: {
        index: Number,
        question: String, 
        amountQuestions: Number,
        category: String, 
        difficulty: String,
        answers: Array, 
        correctAnswer: Array,
        questionsAnswered: Array,
    },
    methods:{
        applyStylesInAnswers(currentAnswer){ //here not use currentQuestionAnswers
            if(currentAnswer === this.currentCorrectAnswer && currentAnswer === this.currentQuestionAnswered){
                return 'correct answer chosen';
            }
            else if (currentAnswer === this.currentCorrectAnswer){
                return 'correct answer not chosen'
            }
            else if(currentAnswer !== this.currentCorrectAnswer && currentAnswer === this.currentQuestionAnswered){
                return 'wrong answer chosen'
            } 
        },
    },
    computed:{
        currentQuestionAnswers(){
            return this.answers[this.index];
        },
        currentCorrectAnswer(){
            return this.correctAnswer[this.index];
        },
        currentQuestionAnswered(){
            return this.questionsAnswered[this.index];
        },
        questionDifficulty(){
            return this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1)
        }
    },
    mounted(){
        console.log(this.currentQuestionAnswers + '  essas são as respostas')
        console.log(this.currentCorrectAnswer + '  essa é a resposta certa')
        console.log(this.currentQuestionAnswered + '   essa é a resposta que o usuario colocou')  
    }
};
</script>

<style scoped>
.question-index-container{
    top: 50%;
    display: flex;
    height: 25px;
    padding-top: 25px;

    justify-content: center;
}
.question-index-container > svg{
    margin-top: 2.2px;
    margin-right: 10px;
    fill: #a3a3a3;
}
.back-container{
    position: absolute;
    height: 25px;
    width: 25px;
    transform: scaleX(-1);
    border-radius: 30px;
    margin-top: -4px;
    height: 35px;
    width: 35px;
    cursor: pointer;
}
.back-container > .back{
    height: 100%;
    width: 100%;
    stroke: rgb(78, 78, 78);
}
.question-container{
    margin: 0 auto;
    text-align:center;
    font-weight: 800;
    min-height: 50px;

    margin-bottom: 12px;
    margin-top: 42px;
    font-size: 18px;
    line-height: 42px;
}
.category-container{
    background-color: #FF5656;
    width: content;
    max-width: max-content;
    text-align: center;
    margin: 0 auto;
    padding: 2px 10px;
    border-radius: 6px;
    color: white;

    margin-bottom: 18px;
    font-size: 16px;

    -webkit-box-shadow: inset 0px 6px 34px -7px rgba(0,0,0,0.25); 
    box-shadow: inset 0px 6px 34px -7px rgba(0,0,0,0.25);
}
.answer{
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
.question-state{
    width: 22px;
    height: 22px;

    border: 2px solid #F6A2A8;
    border-radius: 100px;

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
p{
    text-align: justify;
    margin: 0px 30px;
    color: #8F8F8F;
}
.question-state > svg{
    stroke: black;
    stroke-width: 2px;
    fill: black;
}
.question-state > svg{
    fill: #F599A0;
    stroke: #F599A0;
}
.question-state > .correct{
    display: none;
}

/*  */

.correct-answer-chosen{
    background-color: #70C050;
    transform: scale(1.05);
}
.correct-answer-chosen > .question-state{
    background-color: white;
    border: 2px solid white;
}
.correct-answer-chosen > .question-state > .correct{
    stroke: #70C050;
    fill: #70C050;
    display: block;
}
.correct-answer-chosen > .question-state > .wrong{
    display: none;
}
.correct-answer-chosen > p{
    color: white;
}

/*  */
.correct-answer-not-chosen{
    background-color: #B7DFA7;
}
.correct-answer-not-chosen > .question-state{
    background-color: transparent;
    border: 2px solid white;
}
.correct-answer-not-chosen > .question-state > .correct{
    stroke: white;
    fill: white;
    display: block;
}
.correct-answer-not-chosen > .question-state > .wrong{
    display: none;
}
.correct-answer-not-chosen > p{
    color: white;
}

/*  */
/*  */

.wrong-answer-chosen{
    background-color: #ED4956;
    transform: scale(1.05);
}
.wrong-answer-chosen > .question-state{
    background-color: white;
    border: 2px solid white;
}
.wrong-answer-chosen > .question-state > .wrong{
    stroke: #ED4956;
    fill: #ED4956;
    display: block;
}
.wrong-answer-chosen > .question-state > .correct{
    display: none;
}
.wrong-answer-chosen > p{
    color: white;
}
</style>