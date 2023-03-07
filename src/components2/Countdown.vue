<template>
    <div class="countdown" v-if="progressBarworking" :style="{ width: progressBar.size +'px' }">
        <h3 :style="{ fontSize: progressBar.fontSize + 'px' }">{{ countdownValue }}</h3> 
        <v-progress-circular :color="progressBarColor" :model-value="progressBarProgress" :size="progressBar.size" :width="progressBar.width"></v-progress-circular>
    </div>
</template>
  
<script>
export default {
    props: {
        countdownValueStart: Number,
        currentQuestionIndex: Number,
        progressBarColor: String,
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
            //return this.countdownCurrentValue.toFixed(0);
            return Math.trunc(this.countdownCurrentValue); //if values be a int
        },
        progressBarProgress(){
            return Math.trunc(this.currentProgressBarValue);
        },
        progressBar(){
            let currentSize = 60;
            return {
                size: currentSize,
                width: currentSize * 0.10,
                fontSize: currentSize / 2.2
            }
        }
    },
};
</script>

<style scoped>

.countdown{
    display: flex;
    align-items: center;
    justify-content: center;
}



h3{
    position: absolute;
    font-weight: 500;
    margin-top: 3px;
}
</style>