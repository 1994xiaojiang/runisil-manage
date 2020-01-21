<template>
    <div>
        <div class="className">
            <el-card class="anoCard">
                <div slot="header">
                    <span style="font-weight: 600;font-size: 20px;">订阅查询列表</span>
                </div>
                <div class="searchDiv">
                    <el-input type="text" placeholder="请输入姓名模糊查询" class="input-style" v-model="search"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="searchTab()">搜索</el-button>
                </div>
                <el-table :data="tableData" border stripe>
                    <el-table-column label="姓名" prop="name" width="150" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="邮箱" prop="email">
                    </el-table-column>
                    <el-table-column label="订阅-查询" prop="quantity">
                    </el-table-column>
                    <el-table-column label="信息" prop="message" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="时间" prop="createTime">
                    </el-table-column>
                </el-table>
                <el-pagination background layout="total, sizes, prev, pager, next" :page-sizes="pageSizes"
                               :page-size="pageSize" :current-page="currentPage" :total="total"
                               class="fyDiv" @size-change="handleSize" @current-change="handlePage">
                </el-pagination>
            </el-card>
        </div>
    </div>
</template>

<script>
    import { getSubscribeInquiryList,updateStatusSample } from '@/api/list'
    export default {
        name: "order-list",
        data() {
            return {
                tableData: [],
                search: '',
                currentPage: 1,
                pageSize: 10,
                total: 0,
                pageSizes: [10, 20, 30, 40],
                rowIndex: 0,
            }
        },
        mounted() {
            this.getPageTable()
        },
        methods: {
            handleSize(val) {
                this.pageSize = val;
                this.getPageTable()
            },
            handlePage(val) {
                this.currentPage = val;
                this.getPageTable()
            },
            getPageTable() {
                getSubscribeInquiryList({current:this.currentPage,size:this.pageSize})
                    .then(res => {
                        if(res.status === 'SUCCESS'){
                            this.tableData = res.data.records;
                            this.total = res.data.total
                        }else{
                            this.$message.error(res.msg)
                        }
                    }).catch(error => {
                    this.$message.error(error.message)
                })
            },
            // 查找
            searchTab() {
                var param;
                if(this.search !== undefined){
                    param = {current:this.currentPage,size:this.pageSize,search:this.search}
                }else{
                    param = {current:this.currentPage,size:this.pageSize}
                }
                getSubscribeInquiryList(param).then(res => {
                    if(res.status === 'SUCCESS'){
                        this.tableData = res.data.records;
                        this.total = res.data.total
                    }else{
                        this.$message.error(res.message)
                    }
                }).catch(error =>{
                    this.$message.error(error.message)
                });
            },
        }
    }
</script>
<style lang="scss" scoped>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .input-style{
        width: 180px;
        margin-right: 10px;
    }
    .searchDiv {
        margin-bottom: 20px;
        .el-button {
            padding: 11px 20px;
        }
    }
</style>

