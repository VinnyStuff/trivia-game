<script>
import IconHelpCircle from './icons/IconHelpCircle.vue'

export default {
  data() {
    return {
        questionIndex: 0, //mudar para questionIndex
        questionTimeStamp: 5, //time for next question
        answersShuffled: false,
    };
  },
  methods: {
    Question(){
        if(this.ApiData[this.questionIndex].type === "multiple"){

        }

        let incorrectAnswers = this.ApiData[this.questionIndex].incorrect_answers;
        let rightAnswer = this.ApiData[this.questionIndex].correct_answer;
        console.log(rightAnswer)

        let allPossibleAnswers = incorrectAnswers.concat(rightAnswer);
        //console.log(allPossibleAnswers);

        let shuffledAnswers = this.shuffleArray(allPossibleAnswers);
        //console.log(shuffledAnswers); 

        return{
            type: this.ApiData[this.questionIndex].type,
            category: this.ApiData[this.questionIndex].category,
            difficulty: this.ApiData[this.questionIndex].difficulty,
            question: this.ApiData[this.questionIndex].question,
            answers: shuffledAnswers,
            correctAnswer: rightAnswer,
        }
    },
    QuestionAnswers(){
        if (this.answersShuffled === false){
            let answers = this.Question().answers;
            
            return answers;
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
    selectAnswer(){    
        if (this.questionIndex < this.ApiData.length - 1){
            this.questionIndex++
        }
    },
    TimeStamp(){
        setInterval(() => {
            if(this.questionTimeStamp > 0){
                this.questionTimeStamp--;
            }
        }, 1000);
    }
  },
  props:{
    ApiData: {
      type: Object,
      required: true
    },
  },
  computed: {
    countdown() {
      return this.questionTimeStamp > 0 ? this.questionTimeStamp : 0;
    },
  },
  created() {
    this.TimeStamp()
  },
  watch: {
    questionIndex(newValue, oldValue){
        console.log("QuestionIndex change")
    }
  }
};
</script>

<template>
    <div class="trivia-container">
        <div id="current-question-container">
            <div id="question-index-and-time-stamp-container">
                <div id="question-index-container">
                    <IconHelpCircle/>
                    <h3>{{ questionIndex + 1}}/10</h3>
                </div>
                <div id="time-stamp-container">
                    <h1>{{ countdown }}</h1>
                    <v-progress-circular model-value="20" :size="50" :width="5"></v-progress-circular>
                </div>
            </div>
            <div id="category-container">
                <h3>{{ Question().category }}</h3>
            </div>
            <div id="question-container">
                <h1>{{ decodeEntities(Question().question) }}</h1>
            </div>
        </div>
        <div id="answers-container">
            <button @click="selectAnswer()" v-for="(answer, index) in QuestionAnswers()" :key="index">{{ decodeEntities(answer) }}</button>
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