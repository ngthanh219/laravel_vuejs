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
                                            {{ $helpers.lang.get('page.user.form.' + (data ? 'user_information' : 'create_new_user')) }}
                                        </h3>
                                    </div>
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label>{{ $helpers.lang.get('page.user.login_status') }}</label>
                                            <select class="form-control" v-model="formData.is_login">
                                                <option :value="$constant.USER.LOGIN_STATUS.NOT_LOGGED">{{ $helpers.lang.get('page.user.login_status.not_logged') }}</option>
                                                <option :value="$constant.USER.LOGIN_STATUS.LOGGED">{{ $helpers.lang.get('page.user.login_status.logged') }}</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>{{ $helpers.lang.get('page.user.role') }}</label>
                                            <select class="form-control" v-model="formData.role_id">
                                                <option :value="$constant.USER.ROLE.ADMIN">{{ $helpers.lang.get('page.user.role.admin') }}</option>
                                                <option :value="$constant.USER.ROLE.USER">{{ $helpers.lang.get('page.user.role.user') }}</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>{{ $helpers.lang.get('page.user.email_verified_at') }}</label>
                                            <select class="form-control" v-model="formData.email_verified_at">
                                                <option :value="$constant.USER.IS_VERIFIED_EMAIL.NO">{{ $helpers.lang.get('page.user.email_verified_at.no') }}</option>
                                                <option :value="$constant.USER.IS_VERIFIED_EMAIL.YES">{{ $helpers.lang.get('page.user.email_verified_at.yes') }}</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>{{ $helpers.lang.get('page.user.name') }}</label>
                                            <input type="text" class="form-control form-control-border" :placeholder="$helpers.lang.get('page.form.typing')" v-model="formData.name">
                                        </div>
                                        <div class="form-group">
                                            <label>{{ $helpers.lang.get('page.user.phone') }}</label>
                                            <input type="text" class="form-control form-control-border" :placeholder="$helpers.lang.get('page.form.typing')" v-model="formData.phone">
                                        </div>
                                        <div class="form-group">
                                            <label>{{ $helpers.lang.get('page.user.email') }}</label>
                                            <input type="text" class="form-control form-control-border" :placeholder="$helpers.lang.get('page.form.typing')" v-model="formData.email">
                                        </div>
                                        <div class="form-group" v-if="data != null">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input" type="checkbox" id="customCheckbox2" v-model="formData.is_change_password" :checked="formData.is_change_password == $constant.USER.IS_CHANGE_PASSWORD.YES">
                                                <label for="customCheckbox2" class="custom-control-label cursor-pointer">{{ $helpers.lang.get('page.user.form.change_password') }}</label>
                                            </div>
                                        </div>
                                        <div class="form-group" v-if="formData.is_change_password == $constant.USER.IS_CHANGE_PASSWORD.YES || data == null">
                                            <label>{{ $helpers.lang.get('page.user.password') }}</label>
                                            <input type="text" class="form-control form-control-border" :placeholder="$helpers.lang.get('page.form.typing')" v-model="formData.password">
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <button type="submit" class="btn btn-primary mr-2" v-bind:class="{
                                            disabled: !(this.$helpers.checkChangeFormData(data, formData) || formData.is_change_password == $constant.USER.IS_CHANGE_PASSWORD.YES)
                                        }">
                                            {{ $helpers.lang.get('button.' + (data ? 'update' : 'create')) }}
                                        </button>
                                        <a class="btn btn-danger" @click="closeFormComponent">
                                            {{ $helpers.lang.get('button.cancel') }}
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
        name: "UserPopup",
        props: {
            data: Object,
            closeForm: Function,
            getData: Function
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
                    email_verified_at: this.$constant.USER.IS_VERIFIED_EMAIL.NO,
                    is_change_password: this.$constant.USER.IS_CHANGE_PASSWORD.NO,
                    password: this.$constant.USER.DEFAULT_PASSWORD
                },
                formDataError: {
                    message: '',
                    name: '',
                    email: '',
                    phone: '',
                    is_login: '',
                    role_id: '',
                    email_verified_at: '',
                    is_change_password: '',
                    password: '',
                }
            }
        },
        mounted() {
            this.$helpers.scrollTop();

            setTimeout(() => {
                this.isTransitionActive = true;

                if (this.data) {
                    this.$helpers.mergeArrayData(this.data, this.formData)
                } else {
                    this.formData.is_login = this.$constant.USER.LOGIN_STATUS.NOT_LOGGED;
                    this.formData.role_id = this.$constant.USER.ROLE.USER;
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

                if (this.data) {
                    if (
                        this.$helpers.checkChangeFormData(this.data, this.formData) ||
                        this.formData.is_change_password == this.$constant.USER.IS_CHANGE_PASSWORD.YES
                    ) {
                        this.$helpers.store.setPageLoading(true);
                        await this.update();
                        this.$helpers.store.setPageLoading(false);
                    }
                } else {
                    if (this.$helpers.checkChangeFormData(null, this.formData)) {
                        this.$helpers.store.setPageLoading(true);
                        var transaction = await this.create();

                        if (transaction) {
                            this.getData();
                            this.closeFormComponent(e);
                        } else {
                            this.$helpers.store.setPageLoading(false);
                        }
                    }
                }
            },

            async create() {                
                var transaction = false;
                let form = {
                    request: this.formData,
                    error: this.formDataError
                };

                await this.$services.api.call("createUser", form, (data) => {
                    transaction = true;
                    this.$helpers.store.setNotification(this.$constant.NOTIFICATION.SHOW, this.$helpers.lang.get('messages.create_success'));
                });

                return transaction;
            },

            async update() {
                let form = {
                    id: this.data.id,
                    request: this.formData,
                    error: this.formDataError
                };

                await this.$services.api.call("updateUser", form, (data) => {
                    this.formData.is_change_password = this.$constant.USER.IS_CHANGE_PASSWORD.NO;
                    this.formData.password = this.$constant.USER.DEFAULT_PASSWORD;
                    this.$helpers.mergeArrayData(this.formData, this.data);
                    this.$helpers.store.setNotification(this.$constant.NOTIFICATION.SHOW, this.$helpers.lang.get('messages.update_success'));
                });
            }
        }
    }
</script>
