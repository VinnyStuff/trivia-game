<script setup>
import Trivia from './components/Trivia.vue'
import TriviaAPI from './components/TriviaAPI.vue'
</script>

<template>
  <div class="Game">
    <Trivia/>
    <div>
      <TriviaAPI/>
    </div>
  </div>
</template>

<style scoped>

.Game{
  width: 100vw;
  height: 100vh;
  background-color: #F6F5F5; 

  display: flex;
  justify-content: center;
  align-items: center; 
}

.Game > div{
  position: absolute;
}

</style>
