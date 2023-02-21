<template>
<div style="border: 1px solid green; padding: 3em;">

    <h3>TRIVIA</h3>
    <div>
      ( {{value}} )
    </div>
    

</div>
</template>
<script>

export default {
    props: {
        value: String, 
    },

    // data() { 
    //     return {
    //     };
    // }
};

</script>