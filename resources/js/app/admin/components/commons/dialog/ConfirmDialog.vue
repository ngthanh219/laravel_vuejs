<template>
    <div class="confirm-dialog">
        <div class="dialog-ovelay">
            <div class="dialog">
                <div class="d-header">
                    <h3>{{ $helpers.lang.get('dialog.title') }}</h3>
                    <i class="fas fa-times cursor-pointer" @click="close"></i>
                </div>
                <div class="d-msg">
                    <p>{{ message }}</p>
                </div>
                <div class="d-footer">
                    <div class="controls">
                        <button class="btn btn-danger cursor-pointer mr-2" @click="confirm">{{ $helpers.lang.get('button.confirm') }}</button>
                        <button class="btn btn-default cursor-pointer" @click="close">{{ $helpers.lang.get('button.cancel') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ConfirmDialog",
        props: {
            closeDialog: Function,
            confirmDialog: Function,
            message: String
        },
        created() {
            window.addEventListener('keyup', this.closeByKeyUp);
        },
        beforeUnmount() {
            window.removeEventListener('keyup', this.closeByKeyUp);
        },
        methods: {
            confirm(e) {
                e.preventDefault();

                this.confirmDialog();
            },

            close(e) {
                e.preventDefault();

                this.closeDialog();
            },

            closeByKeyUp(e) {
                if (e.key === 'Escape') {
                    this.closeDialog();
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dialog-ovelay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.50);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;

        .dialog {
            width: 400px;
            background-color: #fff;
            box-shadow: 0 0 20px rgba(0,0,0,.2);
            border-radius: 5px;

            .d-header {
                padding: 10px 8px;
                background-color: #f6f7f9;
                border-bottom: 1px solid #e5e5e5;
                display: flex;
                justify-content: space-between;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;

                h3 {
                    font-size: 15px;
                    margin: 0;
                    color: #555;
                    font-weight: bold;
                }

                i {
                    color: #c4c5c7;
                    transition: all .3s ease;
                    padding: 0 2px;
                    border-radius: 1px;
                }

                i:hover {
                    color: #746868
                }

                i:active {
                    box-shadow: 0 0 5px #673AB7;
                    color: #a2a2a2
                }
            }

            .d-msg {
                padding: 12px 10px;

                p {
                    margin: 0;
                    font-size: 15px;
                    color: #333;
                }
            }

            .d-footer {
                border-top: 1px solid #e5e5e5;
                padding: 8px 10px;
                display: flex;
                justify-content: flex-end;

                button {
                    padding-left: 15px;
                    padding-right: 15px;
                }
            }
        }
    }
</style>
