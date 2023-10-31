<template>
    <div class="content-wrapper page-component">
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
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
                <div class="row">
                    <div class="col-md-2">
                        <div class="form-group input-group-sm">
                            <label>{{ $helpers.lang.get('page.user.filter.information') }}</label>
                            <input type="text" class="form-control" :placeholder="$helpers.lang.get('page.user.filter.information.placeholder')" v-model="query.information">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group input-group-sm">
                            <label>{{ $helpers.lang.get('page.user.login_status') }}</label>
                            <select class="form-control" v-model="query.is_login">
                                <option :value="$constant.LOGIN_STATUS.ALL">{{ $helpers.lang.get('page.user.login_status.all') }}</option>
                                <option :value="$constant.LOGIN_STATUS.NOT_LOGGED">{{ $helpers.lang.get('page.user.login_status.not_logged') }}</option>
                                <option :value="$constant.LOGIN_STATUS.LOGGED">{{ $helpers.lang.get('page.user.login_status.logged') }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6 d-flex align-items-end">
                        <div class="form-group input-group-sm">
                            <a :href="$helpers.router.getQueryString(query)" class="btn btn-primary" @click="filter">{{ $helpers.lang.get('button.filter') }}</a>
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
                                :getData="getData"
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
                                            <th style="width: 250px">{{ $helpers.lang.get('page.user.role') }}</th>
                                            <th style="width: 250px">{{ $helpers.lang.get('page.user.name') }}</th>
                                            <th style="width: 250px">{{ $helpers.lang.get('page.user.phone') }}</th>
                                            <th style="width: 250px">{{ $helpers.lang.get('page.user.email') }}</th>
                                            <th style="width: 250px">{{ $helpers.lang.get('page.user.login_status') }}</th>
                                            <th style="width: 250px">{{ $helpers.lang.get('page.table.created_at') }}</th>
                                            <th style="width: 100px"></th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-data" v-if="dataList && dataList.list.length > 0">
                                        <tr v-for="data, index in dataList.list">
                                            <td>{{ data.id }}</td>
                                            <td>{{ $helpers.lang.get('page.user.role.' + (data.role_id == 0 ? 'admin' : 'user')) }}</td>
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
                                                    {{ $helpers.lang.get('page.user.login_status.' + (data.is_login == 1 ? 'logged' : 'not_logged')) }}
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
                                                                        (
                                                                            $helpers.store.getAuth().user.id == data.id
                                                                            ?
                                                                                true
                                                                            :
                                                                                false
                                                                        )
                                                                )
                                                            }"
                                                            @click="deleteData($event, data.id)"
                                                        >
                                                            <i 
                                                                class="fas"
                                                                v-bind:class="[
                                                                    query.is_deleted == 0 ? 'fa-trash' : 'fa-window-restore'
                                                                ]"
                                                            />
                                                            <div class="icon-wrap">
                                                                {{ $helpers.lang.get('button.' + (query.is_deleted == 0 ? 'delete' : 'restore')) }}
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="text-center no-data" v-if="dataList && dataList.list.length == 0">
                                    {{ $helpers.lang.get('page.table.no_data') }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <UserPopup
            v-if="isForm"

            :data="data"
            :closeForm="closeForm"
            :getData="getData"
        />
    </div>
</template>

<script>
    import TablePagination from '../../commons/pagination/TablePagination.vue';
    import UserPopup from './UserPopup.vue';

    export default {
        name: "User",
        components: {
            TablePagination,
            UserPopup
        },
        data() {
            return {
                dataList: null,
                query: {
                    limit: this.$constant.PAGINATION.LIMIT,
                    page: this.$constant.PAGINATION.PAGE,
                    id_sort: this.$constant.ORDER_BY.DESC,
                    information: "",
                    is_login: this.$constant.LOGIN_STATUS.ALL,
                    is_deleted: this.$constant.IS_DELETE.NO
                },
                formDataError: {
                    message: ""
                },
                isForm: false,
                data: null
            };
        },
        mounted() {
            this.$helpers.router.getCurrentQuery(this.query);

            this.getData();
        },
        methods: {
            async getData() {
                this.$helpers.store.setPageLoading(true);
                let form = {
                    query: this.$helpers.router.getQueryString(this.query),
                    error: this.formDataError
                };

                await this.$services.api.call("getUsers", form, (data) => {
                    this.dataList = data;
                });

                this.$helpers.store.setPageLoading(false);
            },

            filter(e) {
                e.preventDefault();

                this.$helpers.router.pushQueryUrl(this.query);
                this.$helpers.setQueryPage(this.query, this.dataList);
                this.getData();
            },

            sortUserData(e, queryParam) {
                e.preventDefault();

                this.$helpers.setQuerySort(this.query, queryParam);
                this.$helpers.router.pushQueryUrl(this.query);
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

            async deleteData(e, id) {
                e.preventDefault();

                if (this.$store.state.auth.user.id != id) {
                    var alertMessage = this.$helpers.lang.get('messages.delete_action');
                    var successMessage = this.$helpers.lang.get('messages.delete_success');

                    if (this.query.is_deleted == this.$constant.IS_DELETE.YES) {
                        alertMessage = this.$helpers.lang.get('messages.restore_action');
                        successMessage = this.$helpers.lang.get('messages.restore_success');
                    }

                    if (confirm(alertMessage)) {
                        this.$helpers.store.setPageLoading(true);
                        let form = {
                            id: id,
                            error: this.formDataError
                        }

                        await this.$services.api.call("deleteUser", form);
                        this.$helpers.store.setNotification(this.$constant.NOTIFICATION.SHOW, successMessage);

                        this.getData();
                    }
                }
            }
        }
    }
</script>
