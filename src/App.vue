<script setup>
import TriviaController from './components2/TriviaController.vue';
import ApiController from './components2/ApiController.vue';
</script>

<script>
</script>

<template>
  <div class="Game">
    <!-- <TriviaController/> -->
    <ApiController/>
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
@media print {
  body { 
    overflow: auto;
    height: auto; 
  }
}
</style>
