<template>
    <div class="main-menu-container">
        <div class="main-menu" v-if="selectOtherView === false">
            <div class="ilustration-container">
                <h1>📚 Vrika Quiz</h1>
                <img src="./icons/Questions-bro.png" alt="">
            </div>
            <div class="header-container">
                <h1>Welcome, today's theme is:</h1>
                <h1>{{ todayTheme }}</h1>
                <h3>The theme of our quiz is updated daily.</h3>
            </div>
            <div class="buttons-container">
                <button class="get-started-button" @click ="$emit('get-started-click')">
                    <label v-if="isLoading === false">Start</label>
                    <v-progress-circular v-else indeterminate color="white" :size="24"></v-progress-circular>
                </button>
                <button class="select-other-button" @click ="selectOtherView = true">Custom Quiz</button>
            </div>
        </div>
        <div class="select-other-container" v-else>
            <h1>Customize your quiz to fit your preferences:</h1>
            <div class="number-of-questions">
                <v-select
                    clearable
                    label="Number of questions"
                    :items="numberOfQuestions"
                    variant="solo"
                    v-model="numberOfQuestion"
                ></v-select>
            </div>
            <div class="select-category">
                <v-select
                    clearable
                    label="Category"
                    :items="categories"
                    variant="solo"
                    v-model="category"
                ></v-select>
            </div>
            <div class="select-difficulty">
                <v-select
                    clearable
                    label="Difficulty"
                    :items="difficulties"
                    variant="solo"
                    v-model="difficulty"
                    disabled
                ></v-select>
            </div>
            <div class="select-type">
                <v-select
                    clearable
                    label="Type of question"
                    :items="types"
                    variant="solo"
                    v-model="type"
                    disabled
                ></v-select>
            </div>
            <div class="buttons-container">
                <button class="get-started-button"  @click ="$emit('start-custom-quiz', newCustomQuiz)">
                    <label v-if="isLoading === false">Start</label>
                    <v-progress-circular v-else indeterminate color="white" :size="24"></v-progress-circular>
                </button>
                <button class="back-button" @click ="selectOtherView = false">Back</button>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    props: {
        todayTheme: String,
        numberOfQuestions: Number,
        categories: Array,
        difficulties: Array,
        types: Array,
        isLoading: Boolean,
    },
    data(){
        return{
            selectOtherView: false,
            numberOfQuestion: this.numberOfQuestions[1],
            category: this.categories[0],
            difficulty: this.difficulties[0],
            type: this.types[0],
        }
    },
    computed: {
        newCustomQuiz(){
            let newQuiz = {
                numberOfQuestion: this.numberOfQuestion,
                numberOfQuestionIndex: this.numberOfQuestions.indexOf(this.numberOfQuestion),

                category: this.category,
                categoryIndex: this.categories.indexOf(this.category),

                difficulty: this.difficulty,
                difficultyIndex: this.difficulties.indexOf(this.difficulty),

                type: this.type,
                typeIndex: this.types.indexOf(this.type),

            }
            return newQuiz;
        }
    }
};
</script>

<style scoped>
.main-menu-container{
    display: flex;
    align-items: center;
}
.select-other-container > div{
    margin-bottom: 5px;
}
.select-other-container > h1{
    line-height: 40px;
    margin-bottom: 20px;
}

.select-other-container{
    width: 100%;
} 

@keyframes showMenu{
    0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
.main-menu{
    text-align: center;
    animation: showMenu 0.33s ease forwards;
    position: relative;
}
.buttons-container{
    position: relative;
}
.select-other-container{
    text-align: center;
    animation: showMenu 0.33s ease forwards;
}
.header-container ,.ilustration-container{ /* aaaaaaaaaaaaaa */
    margin-bottom: 20px;
}
.ilustration-container{

}
.ilustration-container > h1{
    font-size: 20px;
    margin-bottom: 20px;
}
.ilustration-container > img{
    height: 80%;
    width: 80%;
}
@media only screen and (max-height: 825px) {
    .ilustration-container > img{
        height: 65%;
        width: 65%;
    }
}
@media only screen and (max-height: 755px) {
    .ilustration-container > img{
        height: 50%;
        width: 50%;
    }
}
.header-container > h1{
    line-height: 42px;
}
.header-container > h3{
    margin-top: 4px;
    margin-bottom: -8px;
    font-size: 16px;
    color: #525252;
}
.buttons-container > button{
    width: 60%;
    margin: 6px 0px;
    padding: 12px 20px;
    font-size: 16px;
    border-radius: 30px;
    font-weight: 600;

    transition: 100ms ease;
}
.get-started-button{
    background-color: #FF5656;
    border: 2px solid #FF5656;
    color: white;
}
.select-other-button ,.back-button{
    background-color: transparent;
    color: black;
    border: 2px solid black;
}
.buttons-container >  button:hover{
    background-color: rgba(204, 67, 67, 1);
    border: 2px solid rgba(204, 67, 67, 1);
    color: white;
}
.buttons-container >  button:active{
    transform: scale(0.96);
}
</style>
