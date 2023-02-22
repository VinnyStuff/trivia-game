<template>
    <h3>{{ countdownCurrentValue }}</h3>
    <!-- <h3>{{ countdownValue }}</h3> -->
    <v-progress-circular :model-value="currentProgressBarValue" :size="50" :width="5"></v-progress-circular>
</template>
  
<script>
export default {
    props: {
        countdownValueStart: Number,
    },
    data() {
        return {
            startTimeInClientMachine: null,
            countdownCurrentValue: null,
            interval: null, //this number will subtract the -countdownCurrentValue- per second
            fps: 60,

            currentProgressBarValue: null, 
        };
    },

    mounted() { 
        this.startCountdown();
    },

    methods: {
        startCountdown(){
            if(this.countdownValueStart !== undefined){
                this.startTimeInClientMachine = new Date().getTime() / 1000;

                this.interval = setInterval(() => this.countdown(), 1000 / this.fps);
            }
        },
        countdown(){
            const currentTime = new Date().getTime() / 1000;

            const elapsed = this.countdownValueStart - (currentTime - this.startTimeInClientMachine);

            this.countdownCurrentValue = elapsed;

            //console.log(elapsed);

            this.currentProgressBarValue = 100; //100 is when progress bar is full load
            this.currentProgressBarValue = this.progressBarUnloading(); //change the progress bar increase
            console.log(this.currentProgressBarValue);

            if (elapsed <= 0) {
                this.countdownCurrentValue = 0;
                clearInterval(this.interval);
                this.$emit('coutdownEnd');

                //start coutdown again
                this.startCountdown();
            }
            //console.log(this.countdownValue.toFixed());
        },
        progressBarUnloading(){
            return this.currentProgressBarValue = (100 / this.countdownValueStart) * (this.countdownCurrentValue);
        },
    },

    computed: {
        countdownValue(){
            return this.countdownCurrentValue; // resolver essse problema do toFixed
        }
    }
};
</script>