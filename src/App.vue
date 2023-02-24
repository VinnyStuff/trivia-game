<script setup>
import TriviaGenerator from './components2/TriviaGenerator.vue';
</script>

<script>
</script>

<template>
  <div class="Game">
    <TriviaGenerator class="myTriviaGenerator"/>
  </div>
</template>

<style scoped>

.Game{
  width: 100vw;
  height: 100vh;
  background-color: #d9d9d9; 

  display: flex;
  justify-content: center;
  align-items: center; 
}

.myTriviaGenerator{
  margin: 0px 30px;
  max-width: 700px;
  min-height: 900px;
}
@media only screen and (max-width: 360px) {
  
}
</style>
