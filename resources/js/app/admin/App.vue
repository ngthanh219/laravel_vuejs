<template>
    <router-view></router-view>
</template>

<script>
    export default {
        name: "App",
        mounted() {
            console.clear();
            console.log(
                "%c" + this.$helpers.lang.get('messages.stop') +"!",
                "color:red;font-size:50px;",
            );
        }
    }
</script>
