<template>
    <div class="trivia-results">
        <div v-for="(questions, questionsIndex) in questionsObject" :key="questionsIndex"  :class="{ 'correct-answer': checkAnswer(questionsIndex) === 'correct', 'wrong-answer': checkAnswer(questionsIndex) === 'wrong', 'not-answered': checkAnswer(questionsIndex) === 'notAnswered'}">
            <p>{{ questionsIndex + 1 }}) {{ decodeEntities(questionsObject[questionsIndex].question) }}</p>
        </div>
    </div >
</template>
  
<script>
export default {
    props:{
        questionsObject: Object,
        allQuestionsAnswers: Array,
        correctAnswers: Array,
        questionsAnswered: Array,
    },
    
    methods:{
        decodeEntities(text) {
            const el = document.createElement('textarea');
            el.innerHTML = text;
            return el.value;
        },
        checkAnswer(currentQuestionIndex){
            if (this.questionsAnswered[currentQuestionIndex] === this.correctAnswers[currentQuestionIndex]){
                return 'correct'
            }
            else if (this.questionsAnswered[currentQuestionIndex] === 'this question is not answered'){
                return 'notAnswered';
            } 
            else{
                return 'wrong';
            }
        }
    } 
}
</script>

<style scoped>

.correct-answer{
    background-color: green;
}   
.wrong-answer{
    background-color: red;
}
.not-answered{
    background-color: grey;
}
.trivia-results > div{
    margin-bottom: 10px;
    width: 100%;
    border: solid;
    font-size: 20px;
    border-radius: 35px;
    font-weight: 600;
    padding: 15px 10px;
    padding-left: 50px;
}

.trivia-results > div > p{
    font-size: 18px;
    text-align: justify;
}


</style>