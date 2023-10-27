<template>
    <div class="card-header pagination-custom">
        <h3 class="card-title">
            {{ 
                dataList
                    ? (query.limit * query.page >= dataList.total_record ? dataList.total_record : query.limit * query.page) + ' / ' + dataList.total_record
                    : '0 / 0'
            }} {{ this.$helper.getLang('page.pagination.data') }}
        </h3>
        <div class="card-tools row">
            <div class="input-group input-group-sm data-filter deleted">
                <div class="label">{{ this.$helper.getLang('page.pagination.data_type') }}: </div>
                <select class="form-control" v-model="query.is_deleted" @change="trashedFilter">
                    <option value="0">{{ this.$helper.getLang('page.pagination.data_type.available') }}</option>
                    <option value="1">{{ this.$helper.getLang('page.pagination.data_type.deleted') }}</option>
                </select>
            </div>
            <div class="input-group input-group-sm data-filter page">
                <div class="label">{{ this.$helper.getLang('page.pagination.page') }}: </div>
                <input 
                    type="text" 
                    class="form-control" 
                    v-model="query.page" 
                    @keypress="this.$helper.isNumber($event)"
                    @keyup.enter="pageFilter"
                />
                <!-- @blur="filter" -->
            </div>
            <div class="input-group input-group-sm data-filter">
                <div class="label">{{ this.$helper.getLang('page.pagination.show') }}: </div>
                <select class="form-control" v-model="query.limit" @change="limitFilter">
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                </select>
            </div>
            <div class="pagination-button" v-if="dataList">
                <ul class="pagination pagination-sm float-right">
                    <li class="page-item">
                        <a 
                            class="page-link text-bold" 
                            v-bind:class="[
                                query.page == 1 ? 'disabled' : ''
                            ]"
                            :href="getUrl(false)"
                            @click="prevPage"
                        >
                            <i class="fas fa-angle-left"></i>
                        </a>
                    </li>
                    <li class="page-item">
                        <a 
                            class="page-link text-bold"
                            v-bind:class="[
                                query.page >= dataList.total_page ? 'disabled' : ''
                            ]"
                            :href="getUrl(true)"
                            @click="nextPage"
                        >
                            <i class="fas fa-angle-right"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TablePagination',
        props: {
            dataList: Object,
            query: Object,
            getData: Function
        },
        methods: {
            getUrl(status) {
                var query = this.$helper.getQueryString(this.query);
                var queryObject = this.$helper.queryQueryObject(query);
                queryObject.page = (status ? parseInt(queryObject.page) + 1 : parseInt(queryObject.page) - 1);

                return this.$helper.getQueryString(queryObject);
            },

            trashedFilter(e) {
                e.preventDefault();

                this.query.page = 1;
                this.filterDataTable();
            },

            pageFilter(e) {
                e.preventDefault();

                this.filterDataTable();
            },

            limitFilter(e) {
                e.preventDefault();

                this.query.page = 1;
                this.filterDataTable();
            },

            filterDataTable() {
                this.$helper.setQueryPage(this.query, this.dataList);
                this.$helper.pushQueryUrl(this.query);
                this.getData();
            },

            prevPage(e) {
                e.preventDefault();

                if (this.query.page > 1) {
                    this.query.page--;
                    this.filterDataTable();
                }
            },

            nextPage(e) {
                e.preventDefault();

                this.query.page++;
                this.filterDataTable();
            }
        }
    }
</script>
