<template>
    <div class="notification-dialog">
        <div 
            class="alert alert-dismissible"
            v-bind:class="[
                $store.state.notification.success == 1 ? 'alert-success' : 'alert-danger'
            ]"
        >
            <button type="button" class="close" @click="closeNotification">×</button>
            <h5>
                <i 
                    class="icon fas"
                    v-bind:class="[
                        $store.state.notification.success == 1 ? 'fa-check' : 'fa-ban'
                    ]"
                />
                {{ $store.state.notification.success == 1 ? this.$helpers.lang.get('layout.notification') : this.$helpers.lang.get('layout.notification.alert') }}
            </h5>
            {{$store.state.notification.message}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "Notification",
        data() {
            return {
                proccessPercent: 100,
                intervalId: null,
                notification: null
            }
        },
        mounted() {
            this.notification = this.$store.state.notification;

            if (this.notification.message) {
                this.setProccess();
            }
        },
        updated() {
            this.proccessPercent = 100;
        },
        methods: {
            setProccess() {
                this.intervalId = setInterval(this.move, 50);
            },

            move() {
                if (this.proccessPercent <= 0) {
                    this.$helpers.store.setNotification(0, null);
                    clearInterval(this.intervalId);
                } else {
                    this.proccessPercent -= 1;
                }
            },

            closeNotification() {
                if (this.intervalId) {
                    this.$helpers.store.setNotification(0, null);
                    clearInterval(this.intervalId);
                }
            }
        }
    }
</script>
