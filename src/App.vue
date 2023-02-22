<script setup>
import TriviaGenerator from './components2/TriviaGenerator.vue';
import Countdown from './components2/Countdown.vue';
</script>

<script>
</script>

<template>
  <div class="Game">
    <TriviaGenerator/>
    <div class="bla">
      <Countdown/>
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

.bla{
  position: absolute;
  top: 10%;
}

</style>
