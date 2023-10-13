<template>
    <div class="card-header">
        <h3 class="card-title">
            {{ 
                dataList
                    ? (query.limit * query.page >= dataList.total_record ? dataList.total_record : query.limit * query.page) + ' / ' + dataList.total_record
                    : '0 / 0'
            }} bản ghi
        </h3>
        <div class="card-tools row">
            <div class="input-group input-group-sm data-filter deleted">
                <div class="label">Dữ liệu: </div>
                <select class="form-control" v-model="query.is_deleted" @change="trashedFilter">
                    <option value="0">Khả dụng</option>
                    <option value="1">Đã xóa</option>
                </select>
            </div>
            <div class="input-group input-group-sm data-filter page">
                <div class="label">Trang: </div>
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
                <div class="label">Hiển thị: </div>
                <select class="form-control" v-model="query.limit" @change="limitFilter">
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                </select>
            </div>
            <div v-if="dataList">
                <ul class="pagination pagination-sm float-right">
                    <li class="page-item">
                        <a 
                            class="page-link text-bold" 
                            v-bind:class="[
                                query.page == 1 ? 'disabled' : ''
                            ]" 
                            href="/" 
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
                            href="/"
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
