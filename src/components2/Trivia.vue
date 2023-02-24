<script setup>
import Countdown from './Countdown.vue'
import IconHelpCircle from '../components/icons/IconHelpCircle.vue'
</script>

<script>
export default {
    props: {
        index: Number,
        question: String, 
        amountQuestions: Number,
        category: String, 
        answers: Array, 
        totalCorrectAnswers: Number,
        totalNotAnswered: Number,
        initialCountdownValue: Number,
        gameEnds: Boolean,

    },
    data() {
        return {
            isAnimating: false,
        };
    },
    methods: {
        slideInAnimation() {
            this.isAnimating = true;
            setTimeout(() => {
            this.isAnimating = false;
            }, 100);
        },
    },
    mounted(){
        this.slideInAnimation();
    }
};
</script>

<template>
    <div v-if="gameEnds == false"  class="trivia-container" :class="{ slideIn: isAnimating }">
        <div id="question-index-container"> 
            <IconHelpCircle/> 
            <h3>{{ index + 1}}/{{ amountQuestions }}</h3> 
        </div>
        <div id="time-stamp-container" style="right: 50%;">
           <Countdown :progressBarColor="'rgba(142, 98, 193, 0.8)'" :countdownValueStart="initialCountdownValue" :currentQuestionIndex="index" @coutdownEnd="$emit('trivia-click', 'this question is not answered')" />
        </div>
        <div id="question-container">
            <h1>{{ question }}</h1>
        </div>
        <div id="category-container">
            <h3>{{ category }}</h3>
        </div>
        <div id="answers-container">
           <button @click ="$emit('trivia-click', answersIndex), slideInAnimation()" v-for="(answer, answersIndex) in answers" :key="answersIndex">{{answersIndex + 1}}. {{answers[answersIndex]}}</button>
        </div>
    </div>
    <div v-else>
        <h1>você acertou {{ totalCorrectAnswers }} perguntas</h1>
        <h1>você não respondeu {{ totalNotAnswered }} perguntas</h1>
    </div>
</template>


<style scoped>
.trivia-container{
    max-width: 700px;
    min-height: 900px;
    border-radius: 30px;
    background-color: white;
    -webkit-box-shadow: 0px 10px 22px 1px rgba(0,0,0,0.17);
    -moz-box-shadow: 0px 10px 22px 1px rgba(0,0,0,0.17);
    box-shadow: 0px 10px 22px 1px rgba(0,0,0,0.11);
    position: relative;
    margin: 0px 30px;
    padding: 50px;


}

#question-index-container{
    top: 50%;
    display: flex;
    height: 25px;
    padding-top: 17px;
}

#question-index-container > svg{
    margin-top: 2.2px;
    margin-right: 10px;
    fill: #a3a3a3;
}

#time-stamp-container{
    margin-top: -25px;
    margin-bottom: 10px;
}
#time-stamp-container > div{
    margin: 0 auto;
}

#question-container{
    margin: 0 auto;
    text-align:center;
    font-weight: 800;
    min-height: 50px;

    margin-bottom: 12px;
    font-size: 18px;
}

#category-container{
    background-color: rgba(142, 98, 193, 0.9);
    width: max-content;
    text-align: center;
    margin: 0 auto;
    padding: 2px 10px;
    border-radius: 6px;
    color: white;

    margin-bottom: 18px;
    font-size: 16px;
}

#answers-container >  button{
    background-color: rgba(142, 98, 193, 1);
    width: 100%;
    border: none;
    margin: 6px 0px;
    padding: 12px 20px;
    font-size: 20px;
    text-align: left;
    border-radius: 5px;
    color: white;
    font-weight: 600;

    transition: 250ms ease;
}

#answers-container >  button:hover{
    /* transition: scale(2); */
    transform: scale(1.05);
    transition: 100ms ease;
}
#answers-container >  button:active{
    /* transition: scale(2); */
    transform: scale(0.98);
}



@media only screen and (max-width: 700px) {
    #question-container{
        font-size: clamp(12px, 2.6vw, 18px);
    }
    #category-container{
        font-size: clamp(14px, 2.3vw, 16px);
    }
    #answers-container >  button{   
        font-size: clamp(18px, 3.8vw, 20px)
    }

    .trivia-container{
         padding: clamp(30px, 6.8vw, 50px) clamp(30px, 6.8vw, 50px); 
    }
}

@media only screen and (max-width: 360px) {
    #time-stamp-container{
        margin-left: 75%;
    }
}

@keyframes slide-in {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.slideIn {
    transform: translateX(-100%);
    animation: slide-in 0.045s ease forwards;
}

</style>