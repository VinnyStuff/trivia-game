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
  min-height: 100vh;
  height: max-content;
  background-color: #d9d9d9; 

  display: flex;
  justify-content: center;
  align-items: center; 
}

.myTriviaGenerator{
  margin: 12px 30px;
}
@media only screen and (max-width: 510px) {
  .myTriviaGenerator{
    margin: 20px 15px;
  }
}
</style>
