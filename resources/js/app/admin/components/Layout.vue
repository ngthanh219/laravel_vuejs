<template>
    <div class="wrapper" v-if="isAuth">
        <PageLoading v-if="$store.state.isPageLoading" />

        <Header />

        <Menu />

        <router-view></router-view>

        <Footer />
        
        <Notification v-if="$store.state.notification.message" />
    </div>
</template>

<script>
    import Header from './layouts/Header.vue';
    import Menu from './layouts/Menu.vue';
    import Footer from './layouts/Footer.vue';
    import Notification from './commons/notification/Notification.vue';
    import PageLoading from './commons/loading/PageLoading.vue';

    export default {
        name: 'Layout',
        components: {
            Header,
            Menu,
            Footer,
            Notification,
            PageLoading
        },
        data() {
            return {
                isAuth: false
            }
        },
        mounted() {
            this.$helper.setNotification(0, null);
            this.middleware();
        },
        updated() {
            this.middleware();
        },
        methods: {
            middleware() {
                this.isAuth = false;
                var auth = this.$store.state.auth;

                if (auth.accessToken == null) {
                    this.$helper.redirectPage('login');
                } else {
                    this.isAuth = true;
                }
            }
        }
    }
</script>
