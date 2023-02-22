<script setup>
import TriviaGenerator from './components2/TriviaGenerator.vue';
</script>

<script>
</script>

<template>
  <div class="Game">
    <TriviaGenerator/>
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
  /* position: absolute; */
}

</style>
