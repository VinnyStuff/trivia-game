<template>
<div style="border: 1px solid blue; padding: 10em;">

    <Timer :maxTime="5" @done="timeIsOut()" />

    <Triv :value="currentTrivia"/>
    
</div>

</template>
<script setup>
import Timer from './components/Timer.vue'
import Triv from './Triv.vue'
</script>
<script>

export default {
    data() { 
        return {
            triviaList: ["Abacatte","Peraa","Manga"],
            index: 0,
        };
    },
    methods: {
        timeIsOut() {
            this.index++;
        }
    },
    computed: {
        currentTrivia() {
            return this.triviaList[this.index];
        }
    }
};

</script>