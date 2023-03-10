<script setup>
import Countdown from './Countdown.vue'
import IconHelpCircle from '../components/icons/IconHelpCircle.vue'
import Wrong from '../components/icons/Wrong.vue'
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
        initialCountdownValue: Number,
        gameEnds: Boolean,

    },
    data() {
        return {
            isAnimating: false,
            options: ['A', 'B', 'C' , 'D'],
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
    },
    computed:{
        questionDifficulty(){
            return this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1)
        }
    }
};
</script>

<template>
    <div class="trivia-container" :class="{ slideIn: isAnimating }">
        <div id="question-index-container">  
            <IconHelpCircle/> 
            <h3>{{ index + 1}}/{{ amountQuestions }}</h3> 
        </div>
        <div id="time-stamp-container" style="right: 50%;">
           <Countdown :progressBarColor="'#FF5656'" :countdownValueStart="initialCountdownValue" :currentQuestionIndex="index" @coutdownEnd="$emit('trivia-click', 'this question is not answered'), slideInAnimation()" />
        </div>
        <div id="question-container">
            <h1>{{ question }}</h1>
        </div>
        <div id="category-container">
            <h3>{{ category }} ({{ questionDifficulty }})</h3>
        </div>
        <div id="answers-container">
           <button @click ="$emit('trivia-click', answersIndex), slideInAnimation()" v-for="(answer, answersIndex) in answers" :key="answersIndex">{{options[answersIndex]}}) {{answers[answersIndex]}}</button>
        </div>
        <div class="back-button-container" @click="$emit('back-button-click')">
            <Wrong/>
            <v-tooltip activator="parent" location="bottom">Back to Main Menu</v-tooltip>
        </div>
    </div>
</template>


<style scoped>
.back-button-container{
    height: 30px;
    width: 30px;

    position: absolute;
    right: 4%;
    top: 3%;

    border-radius: 50px;
    padding: 3px;
    border: 2px solid #666666;
    cursor: pointer;

    transition: 200ms ease;

}
.back-button-container:active{
    transform: scale(0.8);
}
.back-button-container > svg{
    width: 100%;
    height: 100%;
    fill: #666666;
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
    transition: 300ms ease;
}

#question-container{
    margin: 0 auto;
    text-align:center;
    font-weight: 800;
    min-height: 50px;

    margin-bottom: 12px;
    font-size: 18px;
    line-height: 42px;
}

#category-container{
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

#answers-container >  button{
    background-color: #FF5656;
    width: 100%;
    border: none;
    margin: 6px 0px;
    padding: 12px 20px;
    font-size: 20px;
    text-align: left;
    border-radius: 5px;
    color: white;
    font-weight: 600;

    transition: 300ms ease;

    -webkit-box-shadow: inset 0px -13px 30px -7px rgba(0,0,0,0.25); 
    box-shadow: inset 0px -13px 30px -7px rgba(0,0,0,0.25);
}
#answers-container >  button:hover{
    transform: scale(1.05);
    transition: 100ms ease;
}
#answers-container >  button:active{
    transform: scale(0.98);
}
#answers-container >  button:focus {
    transform: scale(1);
}

@media only screen and (max-width: 700px) {
    #question-container{
        font-size: clamp(12px, 2.6vw, 18px);
    }
    #category-container{
        font-size: clamp(14px, 2.6vw, 16px);
    }
    #answers-container >  button{   
        font-size: clamp(16px,  2.6vw, 20px)
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