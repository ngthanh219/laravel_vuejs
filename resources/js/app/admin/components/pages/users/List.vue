<template>
    <div
        class="page-component" 
        v-bind:class="[
            isPopup ? 'modal-list' : 'content-wrapper'
        ]"
    >
        <div class="content-header">
            <div class="form-group input-group-sm" v-if="isPopup">
                <a class="btn btn-sm btn-primary cursor-pointer" @click="closePopup">{{ $helpers.lang.get('button.back') }}</a>
            </div>
            <div class="container-fluid">
                <div class="row mb-2" v-if="!isPopup">
                    <div class="col-sm-6">
                        <a class="btn btn-primary" @click="openForm">
                            <i class="id-icon fas fa-plus mr-2"></i>{{ $helpers.lang.get('button.create') }}
                        </a>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                {{ $helpers.lang.get('page.home') }}
                            </li>
                            <li class="breadcrumb-item active">{{ $helpers.lang.get('page.user.title') }}</li>
                        </ol>
                    </div>
                </div>
                <div class="row" v-if="action.array.length == 0">
                    <div class="form-group input-group-sm wmc ml-2 mr-2">
                        <span>{{ $helpers.lang.get('page.user.filter.information') }}</span>
                        <input type="text" class="form-control" :placeholder="$helpers.lang.get('page.user.filter.information.placeholder')" v-model="query.information">
                    </div>
                    <div class="form-group input-group-sm wmc ml-2 mr-2">
                        <span>{{ $helpers.lang.get('page.user.login_status') }}</span>
                        <select class="form-control" v-model="query.is_login">
                            <option :value="$constant.USER.LOGIN_STATUS.ALL">{{ $helpers.lang.get('page.user.login_status.all') }}</option>
                            <option :value="$constant.USER.LOGIN_STATUS.NOT_LOGGED">{{ $helpers.lang.get('page.user.login_status.not_logged') }}</option>
                            <option :value="$constant.USER.LOGIN_STATUS.LOGGED">{{ $helpers.lang.get('page.user.login_status.logged') }}</option>
                        </select>
                    </div>
                    <div class="form-group input-group-sm ml-2 mr-2 d-flex align-items-end">
                        <div class="input-group-sm">
                            <a :href="$helpers.router.getQueryString(query)" class="btn btn-primary" @click="filter">{{ $helpers.lang.get('button.filter') }}</a>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="!isPopup && action.array.length > 0">
                    <div class="form-group input-group-sm wmc b ml-2 mr-2" v-if="query.is_deleted == $constant.IS_DELETE.NO">
                        <div class="input-group-sm mr-2">
                            <span>{{ $helpers.lang.get('page.user.action.delete') }}</span>
                            <button type="button" class="btn btn-block btn-outline-danger" @click="actionMultiData($event, $constant.USER.ACTION_TYPE.DELETE)">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="form-group input-group-sm ml-2 mr-2" v-if="query.is_deleted == $constant.IS_DELETE.YES">
                        <div class="input-group-sm mr-2">
                            <span>{{ $helpers.lang.get('page.user.action.restore') }}</span>
                            <button type="button" class="btn btn-block btn-outline-primary" @click="actionMultiData($event, $constant.USER.ACTION_TYPE.RESTORE)">
                                <i class="fas fa-window-restore"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <TablePagination
                                v-if="dataList"
                                :isPopup="isPopup"
                                :dataList="dataList"
                                :query="query"
                                :getData="getData"
                            />

                            <div class="card-body data-table table-responsive p-0">
                                <table class="table table-hover table-head-fixed text-nowrap">
                                    <thead>
                                        <tr>
                                            <th v-if="!isPopup">
                                                <div class="custom-checkbox">
                                                    <input type="checkbox" :checked="isCheckAll" @click="checkBox">
                                                </div>
                                            </th>
                                            <th v-else style="width: 25px">{{ $helpers.lang.get('page.table.option') }}</th>
                                            <th style="width: 25px">
                                                <a href="/" @click="sortData($event, 'id_sort')">
                                                    ID
                                                    <i
                                                        class="id-icon fas"
                                                        v-bind:class="[
                                                            query.id_sort == 'asc' ? 'fa-arrow-up' : 'fa-arrow-down'
                                                        ]"
                                                    />
                                                </a>
                                            </th>
                                            <th style="width: 250px">{{ $helpers.lang.get('page.user.role') }}</th>
                                            <th style="width: 250px">{{ $helpers.lang.get('page.user.name') }}</th>
                                            <th style="width: 250px">{{ $helpers.lang.get('page.user.phone') }}</th>
                                            <th style="width: 250px">{{ $helpers.lang.get('page.user.email') }}</th>
                                            <th style="width: 250px">{{ $helpers.lang.get('page.user.login_status') }}</th>
                                            <th style="width: 250px">{{ $helpers.lang.get('page.table.created_at') }}</th>
                                            <th style="width: 100px" v-if="!isPopup"></th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-data" v-if="dataList && dataList.list.length > $constant.NO_DATA">
                                        <tr v-for="data, index in dataList.list">
                                            <td v-if="!isPopup">
                                                <div class="custom-checkbox">
                                                    <input type="checkbox" :checked="isCheckAll || action.array.includes(data.id)" @click="checkBox($event, data.id)">
                                                </div>
                                            </td>
                                            <td v-else>
                                                <a class="btn btn-sm btn-danger" v-if="data.id == dataId">{{ $helpers.lang.get('page.table.option.selecting') }}</a>
                                                <a class="btn btn-sm btn-outline-primary" @click="selectDataPopup($event, {
                                                    id: data.id,
                                                    name: data.email
                                                })" v-else>{{ $helpers.lang.get('page.table.option.select') }}</a>
                                            </td>
                                            <td>{{ data.id }}</td>
                                            <td>{{ $helpers.lang.get('page.user.role.' + (data.role_id == $constant.USER.ROLE.ADMIN ? 'admin' : 'user')) }}</td>
                                            <td>{{ data.name }}</td>
                                            <td>{{ data.phone }}</td>
                                            <td class="verify-box">
                                                <a
                                                    class="verified"
                                                    v-bind:class="[
                                                        data.email_verified_at == $constant.USER.IS_VERIFIED_EMAIL.YES ? 'yes' : 'no'
                                                    ]"
                                                >
                                                    <i class="fa fa-check"></i>
                                                </a>
                                                {{ data.email }}
                                            </td>
                                            <td>
                                                <span 
                                                    class="badge"
                                                    v-bind:class="[
                                                        data.is_login == $constant.USER.LOGIN_STATUS.LOGGED ? 'alert-success' : 'alert-secondary'
                                                    ]"
                                                >
                                                    {{ $helpers.lang.get('page.user.login_status.' + (data.is_login == $constant.USER.LOGIN_STATUS.LOGGED ? 'logged' : 'not_logged')) }}
                                                </span>
                                            </td>
                                            <td>{{ data.created_at }}</td>
                                            <td v-if="!isPopup">
                                                <div class="table-action">
                                                    <div class="action-btn">
                                                        <div>
                                                            <div class="dot"></div>
                                                            <div class="dot"></div>
                                                            <div class="dot"></div>
                                                        </div>
                                                    </div>
                                                    <div class="action-detail">
                                                        <a class="action-detail-btn" v-if="query.is_deleted == $constant.IS_DELETE.NO" @click="openForm($event, index, dataList.list[index])">
                                                            <i class="fas fa-eye"></i>
                                                            <div class="icon-wrap">{{ $helpers.lang.get('button.show') }}</div>
                                                        </a>
                                                        <a
                                                            class="action-detail-btn"
                                                            v-bind:class="{
                                                                'disabled' : (
                                                                    $helpers.store.getAuth() == null 
                                                                    ?
                                                                        false
                                                                    :
                                                                        ($helpers.store.getAuth().user.id == data.id ? true : false)
                                                                )
                                                            }"
                                                            @click="deleteData($event, data.id)"
                                                        >
                                                            <i 
                                                                class="fas"
                                                                v-bind:class="[
                                                                    query.is_deleted == $constant.IS_DELETE.NO ? 'fa-trash' : 'fa-window-restore'
                                                                ]"
                                                            />
                                                            <div class="icon-wrap">
                                                                {{ $helpers.lang.get('button.' + (query.is_deleted == $constant.IS_DELETE.NO ? 'delete' : 'restore')) }}
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="text-center no-data" v-if="dataList && dataList.list.length == $constant.NO_DATA">
                                    {{ $helpers.lang.get('page.table.no_data') }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <UserPopup
            v-if="!isPopup && isForm"

            :data="data"
            :closeForm="closeForm"
            :getData="getData"
        />

        <ConfirmDialog
            v-if="!isPopup && confirmDialogContent.isShow"

            :closeDialog="closeConfirmDialog"
            :confirmDialog="confirmDialog"
            :message="confirmDialogContent.message"
        />
    </div>
</template>

<script>
    const COMPONENT_NAME = 'UserList';
    const ACTION_GET = 'getUsers';
    const ACTION_DELETE = 'deleteUser';
    const ACTION_MULTI_DATA = 'actionMultiUser';

    import TablePagination from '../../commons/pagination/TablePagination.vue';
    import ConfirmDialog from '../../commons/dialog/ConfirmDialog.vue';
    import UserPopup from './Popup.vue';

    export default {
        name: COMPONENT_NAME,
        props: {
            isPopupList: Boolean,
            dataId: Number,
            closePopupList: Function,
            setPopupData: Function
        },
        components: {
            TablePagination,
            ConfirmDialog,
            UserPopup
        },
        data() {
            return {
                isPopup: false,
                dataList: null,
                data: null,
                isForm: false,
                isCheckAll: false,
                query: {
                    limit: this.$constant.PAGINATION.LIMIT,
                    page: this.$constant.PAGINATION.PAGE,
                    id_sort: this.$constant.ORDER_BY.DESC,
                    information: "",
                    is_login: this.$constant.USER.LOGIN_STATUS.ALL,
                    is_deleted: this.$constant.IS_DELETE.NO
                },
                formDataError: {
                    message: ""
                },
                confirmDialogContent: {
                    functionName: '',
                    isShow: false,
                    message: '',
                    data: null
                },
                action: {
                    type: this.$constant.USER.ACTION_TYPE.DELETE,
                    array: []
                }
            };
        },
        mounted() {
            if (typeof (this.isPopupList) !== 'undefined') {
                if (this.isPopupList) {
                    this.isPopup = true;
                }
            }

            if (!this.isPopup) {
                this.$helpers.router.getCurrentQuery(this.query);
            }

            this.getData();
        },
        methods: {
            async getData() {
                this.$helpers.store.setPageLoading(true);
                let form = {
                    query: this.$helpers.router.getQueryString(this.query),
                    error: this.formDataError
                };

                await this.$services.api.call(ACTION_GET, form, (data) => {
                    this.dataList = data;
                });

                this.clearParams();
                this.$helpers.store.setPageLoading(false);
            },

            async confirmDeleteData() {
                var id = this.confirmDialogContent.data;
                var successMessage = this.$helpers.lang.get('messages.delete_success');
                if (this.query.is_deleted == this.$constant.IS_DELETE.YES) {
                    successMessage = this.$helpers.lang.get('messages.restore_success');
                }

                this.$helpers.store.setPageLoading(true);
                await this.$services.api.call(ACTION_DELETE, {
                    id: id,
                    error: this.formDataError
                }, (data) => {
                    this.$helpers.store.setNotification(this.$constant.NOTIFICATION.SUCCESS, successMessage);
                    this.getData();
                }, (err) => {
                    this.$helpers.store.setPageLoading(false);
                });

                this.closeConfirmDialog();
            },

            async confirmActionMultiData() {
                this.action.type = this.confirmDialogContent.data;
                var successMessage = this.$helpers.lang.get('messages.delete_success');
                if (this.query.is_deleted == this.$constant.IS_DELETE.YES) {
                    successMessage = this.$helpers.lang.get('messages.restore_success');
                }

                this.$helpers.store.setPageLoading(true);
                await this.$services.api.call(ACTION_MULTI_DATA, {
                    request: {
                        action_type: this.action.type,
                        id_array: JSON.stringify(this.action.array)
                    }
                }, (data) => {
                    this.$helpers.store.setNotification(this.$constant.NOTIFICATION.SUCCESS, successMessage);
                    this.getData();
                }, (err) => {
                    this.$helpers.store.setPageLoading(false);
                });

                this.closeConfirmDialog();
            },

            clearParams() {
                this.isCheckAll = false;
                this.action.array = [];
            },

            filter(e) {
                e.preventDefault();

                if (!this.isPopup) {
                    this.$helpers.router.pushQueryUrl(this.query);
                }

                this.$helpers.setQueryPage(this.query, this.dataList);
                this.getData();
            },

            sortData(e, queryParam) {
                e.preventDefault();

                this.$helpers.setQuerySort(this.query, queryParam);
                if (!this.isPopup) {
                    this.$helpers.router.pushQueryUrl(this.query);
                }

                this.getData();
            },

            openForm(e, index, data) {
                e.preventDefault();

                if (typeof (index) !== 'undefined') {
                    this.data = data;
                    this.data['index'] = index;
                } else {
                    this.data = null;
                }

                this.isForm = true;
            },

            closeForm(e) {
                e.preventDefault();

                this.data = null;
                this.isForm = false;
            },

            checkBox(e, id = null) {
                if (id == null) {
                    this.isCheckAll = this.isCheckAll ? false : true;

                    if (!this.isCheckAll) {
                        this.action.array = [];
                    } else {
                        this.action.array = this.dataList.list.map(obj => obj.id);
                    }
                } else {
                    if (this.action.array.includes(id)) {
                        this.action.array = this.action.array.filter(item => item !== id);
                    } else {
                        this.action.array.push(id);
                    }

                    this.isCheckAll = this.action.array.length < this.dataList.list.length ? false : true;
                }
            },

            handleConfirmDialog(functionName, isShow, message, data) {
                this.confirmDialogContent.function = functionName;
                this.confirmDialogContent.isShow = isShow;
                this.confirmDialogContent.message = message;
                this.confirmDialogContent.data = data;
            },

            closeConfirmDialog() {
                this.handleConfirmDialog('', false, '', null);
            },

            confirmDialog() {
                switch(this.confirmDialogContent.function) {
                    case 'confirmDeleteData': {
                        return this.confirmDeleteData();
                        break;
                    }

                    case 'confirmActionMultiData': {
                        return this.confirmActionMultiData();
                        break;
                    }

                    default:
                        break;
                }
            },

            deleteData(e, id) {
                e.preventDefault();

                if (this.$store.state.auth.user.id != id) {
                    var message = this.$helpers.lang.get('messages.delete_action');
                    if (this.query.is_deleted == this.$constant.IS_DELETE.YES) {
                        message = this.$helpers.lang.get('messages.restore_action');
                    }

                    this.handleConfirmDialog('confirmDeleteData', true, message, id);
                }
            },

            actionMultiData(e, type) {
                e.preventDefault();

                if (this.action.array.length > this.$constant.NO_DATA) {
                    var message = this.$helpers.lang.get('messages.delete_action');
                    if (this.query.is_deleted == this.$constant.IS_DELETE.YES) {
                        message = this.$helpers.lang.get('messages.restore_action');
                    }

                    this.handleConfirmDialog('confirmActionMultiData', true, message, type);
                } else {
                    this.$helpers.store.setNotification(this.$constant.NOTIFICATION.FAIL, this.$helpers.lang.get('messages.action_not_executed'));
                }
            },

            selectDataPopup(e, data) {
                e.preventDefault();

                this.setPopupData(data);
            },

            closePopup(e) {
                this.closePopupList(COMPONENT_NAME);
            }
        }
    }
</script>
