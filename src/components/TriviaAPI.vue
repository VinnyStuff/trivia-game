<script>

async function sendApiRequest(){ //add parameter index in things that have a number
    let response = await fetch ('https://opentdb.com/api.php?amount=10');
    let data = await response.json();

    return data;

    /* let category = data.results[index].category;
    let type = data.results[index].type;
    let question = data.results[index].question;
    let aswers = data.results[index].incorrect_answers;
    aswers.push(data.results[index].correct_answer);
    let correctAnswer = data.results[index].correct_answer; */
}


export default {
    props: {
        
    },
    data(){
        return{
            myData: {}
        }
    },
    async created(){
        let response = await fetch ('https://opentdb.com/api.php?amount=10');
        let data = await response.json();

        this.myData = data;
    }
 }


</script>

<template>
    <div class="api">
        <h1>bla</h1>

        <p></p>
        <p></p>
        <p></p>
        <p></p>
    </div>
</template>

