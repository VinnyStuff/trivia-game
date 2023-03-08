<template>
    <div class="trivia-dialog">
        <div class="question-index-container"> 
            <IconHelpCircle/> 
            <h3>{{ index + 1}}/{{ amountQuestions }}</h3>
        </div>
        <div class="back-container" @click="$emit('back-click')">
            <h1>back</h1>
        </div>
        <div class="question-container">
            <h1>{{ question }}</h1>
        </div>
        <div class="category-container">
            <h3>{{ category }}</h3>
        </div>
        <div class="answers-container">
            <div class="answer" v-for="(answer, answersIndex) in answers[index]" :key="answersIndex">
                <div class="question-state">
                    <Correct class="correct"/>
                    <Wrong class="wrong"/>
                </div>
                <p>{{ answers[index][answersIndex] }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import IconHelpCircle from '../components/icons/IconHelpCircle.vue'

import Wrong from '../components/icons/Wrong.vue'
import Correct from '../components/icons/Check.vue'
</script>

<script>
export default {
    props: {
        index: Number,
        question: String, 
        amountQuestions: Number,
        category: String, 
        answers: Array, 
    },
    mounted(){
        console.log(this.answers)
    }
};
</script>

<style scoped>
.question-index-container{
    top: 50%;
    display: flex;
    height: 25px;
    padding-top: 17px;
}
.question-index-container > svg{
    margin-top: 2.2px;
    margin-right: 10px;
    fill: #a3a3a3;
}
.back-container{
    position: absolute;
    right: 0;
    background-color: #8F8F8F;
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

/*  */

.correct-answer-chosen{
    background-color: #70C050;
}
.correct-answer-chosen > .question-state{
    background-color: white;
    border: 2px solid white;
}
.correct-answer-chosen > .question-state > .correct{
    stroke: #70C050;
    fill: #70C050;
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
}
.correct-answer-not-chosen > p{
    color: white;
}

/*  */
/*  */

.wrong-answer-chosen{
    background-color: #ED4956;
}
.wrong-answer-chosen > .question-state{
    background-color: white;
    border: 2px solid white;
}
.wrong-answer-chosen > .question-state > .wrong{
    stroke: #ED4956;
    fill: #ED4956;
}
.wrong-answer-chosen > p{
    color: white;
}
</style>