<script>
export default {
    props: {
        index: Number,
        question: String, 
        category: String, 
        answers: Array, 
    },
    methods:{
        handleClick(index) {
            console.log("Item clicado:", index);
        }
    }
};
</script>

<template>
    <div class="trivia-container">
        <div id="question-index-container"> 
            <IconHelpCircle/>
            <h3>{{ index }}</h3> 
        </div>
        <div id="time-stamp-container">
            <!-- countdown -->
        </div>
        <div id="question-container">
            <h1>{{ question }}</h1>
        </div>
        <div id="category-container">
            <h3>{{ category }}</h3>
        </div>
        <div id="answers-container">
           <button @click ="$emit('trivia-click', answersIndex)" v-for="(answer, answersIndex) in answers" :key="answersIndex">{{ answers[answersIndex] }}</button>
        </div>
    </div>
</template>


<style scoped>

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
/* 
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
} */
</style>