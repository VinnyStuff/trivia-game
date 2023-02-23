<template>
    <div v-if="progressBarworking">
        <h3>{{ countdownValue }}</h3> <!-- ver dps o fixed ou trunc -->
    <!-- <h3>{{ countdownValue }}</h3> -->
    <v-progress-circular :model-value="progressBarProgress" :size="50" :width="5"></v-progress-circular>
    </div>
</template>
  
<script>
export default {
    props: {
        countdownValueStart: Number,
        currentQuestionIndex: Number,
    },
    data() {
        return {
            startTimeInClientMachine: null,
            countdownCurrentValue: null,
            interval: null, //this number will subtract the -countdownCurrentValue- per second
            fps: 60,

            currentProgressBarValue: null, 
            progressBarworking: false,
        };
    },

    mounted() { 
        this.startCountdown();
        this.checkIfTheCurrentQuestionChanges();
    },

    methods: {
        checkIfTheCurrentQuestionChanges(){
            this.$watch('currentQuestionIndex', (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    if(this.countdownCurrentValue >= 0){
                        this.progressBarworking = false;

                        clearInterval(this.interval);
                        this.startCountdown();
                    }
                }
            })
        },

        startCountdown(){
            if(this.countdownValueStart !== undefined){
                this.startTimeInClientMachine = (new Date().getTime() / 1000);

                this.interval = setInterval(() => this.countdown(), 1000 / this.fps);
            }
        },
        countdown(){
            if(this.countdownCurrentValue >= 0){
                const currentTime = new Date().getTime() / 1000;
                const elapsed = this.countdownValueStart - (currentTime - this.startTimeInClientMachine);
                this.countdownCurrentValue = elapsed;

                this.currentProgressBarValue = 100; //100 is when progress bar is full load
                this.currentProgressBarValue = this.progressBarUnloading(); //change the progress bar increase
                this.progressBarworking = true;
                //vai precisar de um if aqui para arrumar o relogio quando responde alguma pergunta
            }
            else{
                this.countdownCurrentValue = 0;
                this.$emit('coutdownEnd');
                clearInterval(this.interval);

                //start coutdown again
                this.progressBarworking = false;
                this.startCountdown();
            }
        },


        progressBarUnloading(){
            return this.currentProgressBarValue = (100 / this.countdownValueStart) * (this.countdownCurrentValue);
        },
    },
    beforeUnmount() {
        clearInterval(this.interval);
    },

    computed: {
        countdownValue(){
            return this.countdownCurrentValue; // resolver essse problema do toFixed
        },
        progressBarProgress(){
            return Math.trunc(this.currentProgressBarValue);
        }
    },
};
</script>