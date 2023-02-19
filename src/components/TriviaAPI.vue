<script>

async function sendApiRequest(){
    let response = await fetch ('https://opentdb.com/api.php?amount=10');
    //console.log(response);
    let data = await response.json()
    //console.log(data);
    console.log(data.results[0]);
/*     console.log(data.results[0].category);
    console.log(data.results[0].type);
    console.log(data.results[0].difficulty);
    console.log(data.results[0].incorrect_answers);
    console.log(data.results[0].correct_answer); */
}

export default {
  methods:{
   
  },
  

  data(){
    return{
        
    };
  },

  mounted(){
    sendApiRequest();
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

