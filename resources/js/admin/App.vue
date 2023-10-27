<template>
    <router-view></router-view>
</template>

<script>
    export default {
        name: "App",
        mounted() {
            console.clear();
            console.log(
                "%c" + this.$helper.getLang('messages.stop') +"!",
                "color:red;font-size:50px;",
            );
        }
    }
</script>
