<script>
import IconHelpCircle from './icons/IconHelpCircle.vue'



export default {
  data() {
    return {
      currentQuestionTimer: 5,
      myData: {},
      //questions: null,
    };
  },
  async beforeMount() {
    this.myData = await this.sendApiRequest();

    //this.questions = this.myData.question;
  },
  methods: {
    async sendApiRequest() {
        let response = await fetch('https://opentdb.com/api.php?amount=10');
        let data = await response.json();
        
        //console.log(data.results[].question);

        return data.results;
    },
    timer() {
      let interval = setInterval(() => {
        this.currentQuestionTimer--;
      }, 1000);
    },
    decodeEntities(text) {
      const el = document.createElement('textarea');
      el.innerHTML = text;
      return el.value;
    },
  },
};
</script>

<template>
    <div class="trivia-container">
        <div id="question-container">
            <div id="current-question-and-timer">
                <div id="current-question">
                    <IconHelpCircle/>
                    <h3>0/10</h3>
                </div>
                <div id="timer">
                    <h1 v-if="currentQuestionTimer>0">{{ currentQuestionTimer }}</h1>
                    <v-progress-circular model-value="20" :size="50" :width="5"></v-progress-circular>
                </div>
            </div>
            <div id="current-question-theme">
                <h3>Technology</h3>
            </div>
            <div id="current-question-text">
                <h1>{{decodeEntities(myData) }}</h1>
            </div>
        </div>
        <div id="answers-container">
            <button id="answer-button-1">1. Germany</button>
            <button id="answer-button-1">2. United States</button>
            <button id="answer-button-1">3. Sweden</button>
            <button id="answer-button-1">4. Finland</button>
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









#question-container{
    margin-bottom: 30px;
}

#current-question-and-timer{
    position: relative;
    
}

#current-question{ 
    display: flex;
    position: absolute;
    float: left;
    top: 16.5%;
    left: 1rem;
}
#current-question > h3{ 
    margin-left: 8px;
}

#timer{
    display: inline-block;
}
#timer > h1{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}



#question-container> div{

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