<template>
    <div class="popup-component" v-bind:class="{ 'transition-active': !isTransitionActive }">
        <div class="pc-form" v-bind:class="{ 'transition-active': isTransitionActive }">
            <div class="content">
                <div class="container-fluid" style="width: 500px">
                    <div class="row">
                        <div class="col-md-12">
                            <form @submit="handleData">
                                <div class="card card-primary">
                                    <div class="card-header">
                                        <h3 class="card-title">
                                            {{ $helper.getLang('page.user.form.' + (userData ? 'user_information' : 'create_new_user')) }}
                                        </h3>
                                    </div>
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label>{{ $helper.getLang('page.user.login_status') }}</label>
                                            <select class="form-control" v-model="formData.is_login">
                                                <option value="0">{{ $helper.getLang('page.user.login_status.not_logged') }}</option>
                                                <option value="1">{{ $helper.getLang('page.user.login_status.logged') }}</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>{{ $helper.getLang('page.user.role') }}</label>
                                            <select class="form-control" v-model="formData.role_id">
                                                <option value="0">{{ $helper.getLang('page.user.role.admin') }}</option>
                                                <option value="1">{{ $helper.getLang('page.user.role.user') }}</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>{{ $helper.getLang('page.user.name') }}</label>
                                            <input type="text" class="form-control form-control-border" :placeholder="$helper.getLang('page.form.typing')" v-model="formData.name">
                                        </div>
                                        <div class="form-group">
                                            <label>{{ $helper.getLang('page.user.phone') }}</label>
                                            <input type="text" class="form-control form-control-border" :placeholder="$helper.getLang('page.form.typing')" v-model="formData.phone">
                                        </div>
                                        <div class="form-group">
                                            <label>{{ $helper.getLang('page.user.email') }}</label>
                                            <input type="text" class="form-control form-control-border" :placeholder="$helper.getLang('page.form.typing')" v-model="formData.email">
                                        </div>
                                        <div class="form-group" v-if="userData != null">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input" type="checkbox" id="customCheckbox2" v-model="formData.is_change_password" :checked="formData.is_change_password == 1">
                                                <label for="customCheckbox2" class="custom-control-label cursor-pointer">{{ $helper.getLang('page.user.form.change_password') }}</label>
                                            </div>
                                        </div>
                                        <div class="form-group" v-if="formData.is_change_password == 1 || userData == null">
                                            <label>{{ $helper.getLang('page.user.password') }}</label>
                                            <input type="text" class="form-control form-control-border" :placeholder="$helper.getLang('page.form.typing')" v-model="formData.password">
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <button type="submit" class="btn btn-primary mr-2" v-bind:class="{
                                            disabled: !(this.$helper.checkChangeFormData(userData, formData) || formData.is_change_password == 1)
                                        }">
                                            {{ $helper.getLang('button.' + (userData ? 'update' : 'create')) }}
                                        </button>
                                        <a class="btn btn-danger" @click="closeFormComponent">
                                            {{ $helper.getLang('button.cancel') }}
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserInformationPopup",
        props: {
            closeForm: Function,
            getUserData: Function,
            userData: Object
        },
        data() {
            return {
                isTransitionActive: false,
                formData: {
                    name: null,
                    email: null,
                    phone: null,
                    is_login: null,
                    role_id: null,
                    is_change_password: 0,
                    password: '123456'
                },
                formDataError: {
                    message: '',
                    name: '',
                    email: '',
                    phone: '',
                    is_login: '',
                    role_id: '',
                    is_change_password: '',
                    password: '',
                }
            }
        },
        mounted() {
            this.$helper.scrollTop()

            setTimeout(() => {
                this.isTransitionActive = true;

                if (this.userData) {
                    this.$helper.mergeArrayData(this.userData, this.formData)
                } else {
                    this.formData.is_login = 0;
                    this.formData.role_id = 1;
                }
            }, 200);
        },
        methods: {
            closeFormComponent(e) {
                e.preventDefault();

                this.isTransitionActive = false;
                setTimeout(() => {
                    this.closeForm(e);
                }, 400);
            },

            async handleData(e) {
                e.preventDefault();

                if (this.userData) {
                    if (this.$helper.checkChangeFormData(this.userData, this.formData) || this.formData.is_change_password == 1) {
                        this.$helper.setPageLoading(true);
                        await this.update();
                    }
                } else {
                    if (this.$helper.checkChangeFormData(null, this.formData)) {
                        this.$helper.setPageLoading(true);
                        var transaction = await this.create();

                        if (transaction) {
                            this.getUserData();
                            this.closeFormComponent(e);
                        } else {
                            this.$helper.setPageLoading(false);
                        }
                    }
                }
            },

            async create() {
                var transaction = false;
                await this.$store.dispatch("createUser", {
                    request: this.formData,
                    error: this.formDataError
                })
                .then(res => {
                    transaction = true;
                    this.$helper.setNotification(1, this.$helper.getLang('messages.create_success'));
                })
                .catch(err => {

                });

                return transaction;
            },

            async update() {
                await this.$store.dispatch("updateUser", {
                    id: this.userData.id,
                    request: this.formData,
                    error: this.formDataError
                })
                .then(res => {
                    this.formData.is_change_password = 0;
                    this.formData.password = '123456';
                    this.$helper.mergeArrayData(this.formData, this.userData);
                    this.$helper.setNotification(1, this.$helper.getLang('messages.update_success'));
                })
                .catch(err => {

                });
                this.$helper.setPageLoading(false);
            }
        }
    }
</script>
