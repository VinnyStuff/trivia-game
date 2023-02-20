<script>
import IconHelpCircle from './icons/IconHelpCircle.vue'

export default {
  data() {
    return {
        currentQuestionIndex: 0, //mudar para questionIndex
        questionTimeStamp: 5,
    };
  },
  methods: {
    updateQuestionTimeStamp() { 
      let interval = setInterval(() => {
        this.questionTimeStamp--;
      }, 1000);
    },
    question(){
        if(this.ApiData[this.currentQuestionIndex].type === "multiple"){

        }      

        let incorrectAnswers = this.ApiData[this.currentQuestionIndex].incorrect_answers;
        let rightAnswer = this.ApiData[this.currentQuestionIndex].correct_answer;

        let allPossibleAnswers = incorrectAnswers.concat(rightAnswer);
        console.log(allPossibleAnswers);

        let shuffledAnswers = this.shuffleArray(allPossibleAnswers);
        console.log(shuffledAnswers); 

        return{
            type: this.ApiData[this.currentQuestionIndex].type,
            category: this.ApiData[this.currentQuestionIndex].category,
            difficulty: this.ApiData[this.currentQuestionIndex].difficulty,
            question: this.ApiData[this.currentQuestionIndex].question,
            answers: shuffledAnswers,
            correctAnswer: rightAnswer,
        }
    },
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
        return array;
    },
    decodeEntities(text) {
      const el = document.createElement('textarea');
      el.innerHTML = text;
      return el.value;
    },
    test(){    
        if (this.currentQuestionIndex < 9){
            this.currentQuestionIndex++
        }
    }
  },
  props:{
    ApiData: {
      type: Object,
      required: true
    },
  },
  mounted(){

  },
};
</script>

<template>
    <div @click="test()" class="trivia-container">
        <div id="current-question-container">
            <div id="question-index-and-time-stamp-container">
                <div id="question-index-container">
                    <IconHelpCircle/>
                    <h3>{{ currentQuestionIndex + 1}}/10</h3>
                </div>
                <div id="time-stamp-container">
                    <h1 v-if="questionTimeStamp > 0">{{ }}</h1>
                    <h1 v-else>0</h1>
                    <v-progress-circular model-value="20" :size="50" :width="5"></v-progress-circular>
                </div>
            </div>
            <div id="category-container">
                <h3>{{ question().category }}</h3>
            </div>
            <div id="question-container">
                <h1>{{ decodeEntities(question().question) }}</h1>
            </div>
        </div>
        <div id="answers-container">
            <button v-for="(answer, index) in question().answers" :key="index">{{ decodeEntities(answer) }}</button> <!-- entender depois isso, naõ entendi muito bem -->
        </div>
    </div>
</template>


<style scoped>

.trivia-container{
    max-width: 750px;
    height: 850px;
    border-radius: 30px;
    background-color: white;
    -webkit-box-shadow: 0px 10px 22px 1px rgba(0,0,0,0.17);
    -moz-box-shadow: 0px 10px 22px 1px rgba(0,0,0,0.17);
    box-shadow: 0px 10px 22px 1px rgba(0,0,0,0.11);
    text-align: center;   

}

.trivia-container > div{
    border: dashed red;
}









#current-question-container{
    margin-bottom: 30px;
}

#question-index-and-time-stamp-container{
    position: relative;
    
}

#question-index-container{ 
    display: flex;
    position: absolute;
    float: left;
    top: 16.5%;
    left: 1rem;
}
#question-index-container > h3{ 
    margin-left: 8px;
}

#time-stamp-container{
    display: inline-block;
}
#time-stamp-container > h1{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}








#answers-container > button{
    background-color: #1687A7;
    border: none;
    margin: 5px 0px;
    width: 80%;
    max-width: 90%;
    padding: 12px 20px;
    text-align: left;
    border-radius: 5px;
    font-size: 1rem;
    color: white;
    font-weight: bold;
}
</style>