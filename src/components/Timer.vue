<template>
    <div style="border: 1px solid red;">
        <h1>{{startTime}}</h1>
        <h2>{{xx}}</h2>
    </div>
</template>

<script>
export default {
    props: {
        maxTime: Number,
    },
    data() {
        return {
            startDate: null,

            x: 0,
            intervalId: null,
        };
    },

    mounted() { 
        this.startTime = new Date().getTime() / 1000;

        const FPS = 7;
        this.intervalId = setInterval(() => this.frame(), 1000/FPS);
    },

    methods: {
        frame() {
            const currentTime = new Date().getTime() / 1000;
            const elapsed = this.maxTime - (currentTime - this.startTime);
            this.x = elapsed;

            if (elapsed <= 0) {
                this.x = 0;
                clearInterval(this.intervalId);
                this.$emit('done');
            }
        }
    },

    computed: {
        xx() { 
            return this.x.toFixed(2);
        }
    }
};
</script>