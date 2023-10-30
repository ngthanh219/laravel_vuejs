<template>
    <div class="content-wrapper page-component">
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <a class="btn btn-primary" @click="openForm">
                            <i class="id-icon fas fa-plus mr-2"></i>{{ $helper.getLang('button.create') }}
                        </a>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                {{ $helper.getLang('page.home') }}
                            </li>
                            <li class="breadcrumb-item active">{{ $helper.getLang('page.user.title') }}</li>
                        </ol>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <div class="form-group input-group-sm">
                            <label>{{ $helper.getLang('page.user.filter.information') }}</label>
                            <input type="text" class="form-control" :placeholder="$helper.getLang('page.user.filter.information.placeholder')" v-model="query.information">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group input-group-sm">
                            <label>{{ $helper.getLang('page.user.login_status') }}</label>
                            <select class="form-control" v-model="query.is_login">
                                <option value="2">{{ $helper.getLang('page.user.login_status.all') }}</option>
                                <option value="0">{{ $helper.getLang('page.user.login_status.not_logged') }}</option>
                                <option value="1">{{ $helper.getLang('page.user.login_status.logged') }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6 d-flex align-items-end">
                        <div class="form-group input-group-sm">
                            <a :href="$helper.getQueryString(query)" class="btn btn-primary" @click="filter">{{ $helper.getLang('button.filter') }}</a>
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
                                :dataList="dataList"
                                :query="query"
                                :getData="getUserData"
                            />

                            <div class="card-body data-table table-responsive p-0">
                                <table class="table text-center table-hover table-head-fixed text-nowrap">
                                    <thead>
                                        <tr>
                                            <th style="width: 25px">
                                                <a href="/" @click="sortUserData($event, 'id_sort')">
                                                    ID
                                                    <i
                                                        class="id-icon fas"
                                                        v-bind:class="[
                                                            query.id_sort == 'asc' ? 'fa-arrow-up' : 'fa-arrow-down'
                                                        ]"
                                                    />
                                                </a>
                                            </th>
                                            <th style="width: 250px">{{ $helper.getLang('page.user.role') }}</th>
                                            <th style="width: 250px">{{ $helper.getLang('page.user.name') }}</th>
                                            <th style="width: 250px">{{ $helper.getLang('page.user.phone') }}</th>
                                            <th style="width: 250px">{{ $helper.getLang('page.user.email') }}</th>
                                            <th style="width: 250px">{{ $helper.getLang('page.user.login_status') }}</th>
                                            <th style="width: 250px">{{ $helper.getLang('page.table.created_at') }}</th>
                                            <th style="width: 100px"></th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-data" v-if="dataList && dataList.list.length > 0">
                                        <tr v-for="data, index in dataList.list">
                                            <td>{{ data.id }}</td>
                                            <td>{{ $helper.getLang('page.user.role.' + (data.role_id == 0 ? 'admin' : 'user')) }}</td>
                                            <td>{{ data.name }}</td>
                                            <td>{{ data.phone }}</td>
                                            <td>{{ data.email }}</td>
                                            <td>
                                                <span 
                                                    class="badge" 
                                                    v-bind:class="[
                                                        data.is_login == 1 ? 'alert-success' : 'alert-secondary'
                                                    ]"
                                                >
                                                    {{ $helper.getLang('page.user.login_status.' + (data.is_login == 1 ? 'logged' : 'not_logged')) }}
                                                </span>
                                            </td>
                                            <td>{{ data.created_at }}</td>
                                            <td>
                                                <div class="table-action">
                                                    <div class="action-btn">
                                                        <div>
                                                            <div class="dot"></div>
                                                            <div class="dot"></div>
                                                            <div class="dot"></div>
                                                        </div>
                                                    </div>
                                                    <div class="action-detail">
                                                        <a class="action-detail-btn" v-if="query.is_deleted == 0" @click="openForm($event, index, dataList.list[index])">
                                                            <i class="fas fa-eye"></i>
                                                            <div class="icon-wrap">{{ $helper.getLang('button.show') }}</div>
                                                        </a>
                                                        <a class="action-detail-btn" v-bind:class="{ 'disabled' : ($helper.getAuth() == null ? false : ($helper.getAuth().user.id == data.id ? true : false)) }" @click="deleteData($event, data.id)">
                                                            <i 
                                                                class="fas"
                                                                v-bind:class="[
                                                                    query.is_deleted == 0 ? 'fa-trash' : 'fa-window-restore'
                                                                ]"
                                                            />
                                                            <div class="icon-wrap">
                                                                {{ $helper.getLang('button.' + (query.is_deleted == 0 ? 'delete' : 'restore')) }}
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="text-center no-data" v-if="dataList && dataList.list.length == 0">
                                    {{ $helper.getLang('page.table.no_data') }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <UserInformationPopup
            v-if="isForm"

            :closeForm="closeForm"
            :userData="data"
            :getUserData="getUserData"
        />
    </div>
</template>

<script>
    import TablePagination from '../../commons/pagination/TablePagination.vue';
    import UserInformationPopup from './UserInformationPopup.vue';

    export default {
        name: "User",
        components: {
            TablePagination,
            UserInformationPopup
        },
        data() {
            return {
                dataList: null,
                query: {
                    limit: 15,
                    page: 1,
                    id_sort: "desc",
                    information: "",
                    is_login: 2,
                    is_deleted: 0
                },
                formDataError: {
                    message: ""
                },
                isForm: false,
                data: null
            };
        },
        mounted() {
            this.$helper.getCurrentQuery(this.query);

            this.getUserData();
        },
        methods: {
            async getUserData() {
                this.$helper.setPageLoading(true);
                await this.$store.dispatch("getUsers", {
                    query: this.$helper.getQueryString(this.query),
                    error: this.formDataError
                })
                .then(res => {
                    this.dataList = res.data;
                })
                .catch(err => {
                });
                this.$helper.setPageLoading(false);
            },

            filter(e) {
                e.preventDefault();

                this.$helper.pushQueryUrl(this.query);
                this.$helper.setQueryPage(this.query, this.dataList);
                this.getUserData();
            },

            sortUserData(e, queryParam) {
                e.preventDefault();

                this.$helper.setQuerySort(this.query, queryParam);
                this.$helper.pushQueryUrl(this.query);
                this.getUserData();
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

            async deleteData(e, id) {
                e.preventDefault();

                if (this.$store.state.auth.user.id != id) {
                    var alertMessage = this.$helper.getLang('messages.delete_action');
                    var successMessage = this.$helper.getLang('messages.delete_success');

                    if (this.query.is_deleted == 1) {
                        alertMessage = this.$helper.getLang('messages.restore_action');
                        successMessage = this.$helper.getLang('messages.restore_success');
                    }

                    if (confirm(alertMessage)) {
                        this.$helper.setPageLoading(true);
                        await this.$store.dispatch("deleteUser", {
                            id: id,
                            error: this.formDataError
                        })
                        .then(res => {
                            this.$helper.setNotification(1, successMessage);
                        })
                        .catch(err => {

                        });

                        this.getUserData();
                    }
                }
            }
        }
    }
</script>
