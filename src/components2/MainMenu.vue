<template>
    <div class="first-page">
        <div class="page-logo"> 
            <img src="../../quiz-favicon.png" alt="">
        </div>
        <div>
            <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio, nostrum.</h1>
        </div>
        <div class="get-started">
            <button>Get Started</button>
        </div>
    </div>
</template>

<script setup>

</script>

<script>
</script>

<style scoped>
.page-logo{    
    background-color: #E0C6A8;

    margin: 0px 5.5vw;
    border-bottom-right-radius: 70px;
    border-bottom-left-radius: 70px;

    display: flex;
    justify-content: center;
    align-items: center;

    min-height: 520px;
    height: max-content;
    margin-top: -40px;
}
@media only screen and (max-width: 700px) {
    .page-logo{
        margin-top: -6vw; 
    }
}
.page-logo > img{
    max-width: 120%;
    max-height: 120%;
    filter: drop-shadow(5px 15px 6px rgba(0, 0, 0, 0.4));
    margin-bottom: -40px;
}
.get-started{
    background-color: antiquewhite;
    max-width: 220px;
    margin: 0 auto;
}
.get-started >  button{
    background-color: #EE2B47;
    border: none;
    padding: 12px 20px;
    font-size: 20px;
    text-align: left;
    border-radius: 5px;
    color: white;
    font-weight: 600;

    transition: 300ms ease;

    -webkit-box-shadow: inset 0px -13px 30px -7px rgba(0,0,0,0.25); 
    box-shadow: inset 0px -13px 30px -7px rgba(0,0,0,0.25);
    text-align: center;
    width: 100%;
}
.get-started >  button:hover{
    transform: scale(1.05);
    transition: 100ms ease;
}
.get-started >  button:active{
    transform: scale(0.98);
}
</style>
