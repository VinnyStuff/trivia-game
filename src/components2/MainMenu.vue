<template>
    <div class="main-menu-container">
        <div class="ilustration-container">
            <h1>📚 Vrika Quiz</h1>
            <img src="./icons/Questions-bro.png" alt="">
        </div>
        <div class="header-container">
            <h1>Welcome, today's theme is:</h1>
            <h1>{{ theme }}</h1>
            <h3>The theme of our quiz is updated daily.</h3>
        </div>
        <div class="buttons-container">
            <button class="get-started" @click ="$emit('get-started')">Get Started</button>
            <button class="select-other" @click ="$emit('select-other')">Select other</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        theme: String,
    },
};
</script>

<style scoped>
.main-menu-container{
    text-align: center;
}
.main-menu-container > div{
    margin-bottom: 20px;
}
.ilustration-container > h1{
    font-size: 20px;
}
.ilustration-container > img{
    max-width: 82%;
}
.header-container > h1{
    line-height: 42px;
}
.header-container > h3{
    font-size: 16px;
    color: #525252;
}
.buttons-container > button{
    width: 60%;
    margin: 6px 0px;
    padding: 12px 20px;
    font-size: 16px;
    border-radius: 30px;
    font-weight: 600;

    transition: 100ms ease;
}
.get-started{
    background-color: #FF5656;
    border: 2px solid #FF5656;
    color: white;
}
.select-other{
    background-color: transparent;
    color: black;
    border: 2px solid black;
}
.buttons-container >  button:hover{
    background-color: rgba(204, 67, 67, 1);
    border: 2px solid rgba(204, 67, 67, 1);
    color: white;
}
.buttons-container >  button:active{
    transform: scale(0.96);
}
</style>
