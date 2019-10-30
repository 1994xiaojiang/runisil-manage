<template>
    <div>
        <div v-if="secondpage" class="className">
            <el-card class="anoCard">
                <div slot="header">
                    <span style="font-weight: 600;font-size: 20px;">应用信息列表</span>
                </div>
                <div class="searchDiv">
                    <el-input type="text" placeholder="请输入标题名称" class="width1" v-model="sch_order"></el-input>
                    <el-select v-model="sch_status" clearable class="width1" placeholde="请选择状态">
                        <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                    <!--                    <el-date-picker class="width1" v-model="sch_date" type="date"-->
                    <!--                                    placeholder="选择日期时间" value-format="yyyy-MM-dd"></el-date-picker>-->
                    <el-button type="primary" icon="el-icon-search" @click="searchTab()">搜索</el-button>
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addTab">添加</el-button>
                </div>

                <el-table :data="tableData" border stripe>
                    <el-table-column prop="id" label="ID" width="80"></el-table-column>
                    <el-table-column prop="name" label="标题" width="300"></el-table-column>
                    <el-table-column prop="description" label="描述" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
                    <el-table-column prop="status" label="状态" width="90">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.status | tagClass">
                                {{scope.row.status | statusText}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="editTable(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="success" @click="toSuccess(scope.row)"
                                       :disabled="scope.row.status === 1">发布</el-button>
                            <el-button type="danger" @click="toDelete(scope.row)"
                                       :disabled="!(scope.row.status === 1 && scope.row.status !== 0)">下架</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background layout="total, sizes, prev, pager, next" :page-sizes="pageSizes"
                               :page-size="pageSize" :current-page="currentPage" :total="total"
                               class="fyDiv" @size-change="handleSize" @current-change="handlePage">
                </el-pagination>
            </el-card>
        </div>
        <router-view v-else></router-view>
    </div>
</template>

<script>
    import { getApplicationPage,getApplicationPageByValue,updateStatusApplication } from '@/api/application'
    export default {
        data() {
            return {
                tableData: [],
                allList: [],
                schArr: [],
                sch_order: '',
                sch_status: null,
                currentPage: 1,
                pageSize: 10,
                total: 0,
                pageSizes: [10, 20, 30, 40],
                diaIsShow: false,
                editType: '',
                options: [
                    { label: '草稿', value: 0 },
                    { label: '发布', value: 1 },
                    { label: '下架', value: 2 }
                ],
                rowIndex: 0,
            }
        },
        computed:{
            secondpage(){
                return this.$store.state.secondpage;
            }
        },
        mounted() {
            this._getPageTab2()
        },
        watch: {
            $route(to, from) {
                if(to.path === '/website/application-page'){
                    this._getPageTab2()
                }
            }
        },
        filters: {
            statusText(val) {
                if (val === undefined) return;
                if (val === 0) {
                    return '草稿'
                } else if (val === 1) {
                    return '发布中'
                } else if (val === 2) {
                    return '已下架'
                }
            },
            tagClass(val) {
                if (val === undefined) return;
                if (val === 0) {
                    return 'warning'
                } else if (val === 1) {
                    return 'success'
                } else if (val === 2) {
                    return 'danger'
                }
            }
        },
        methods: {
            handleSize(val) {
                this.pageSize = val;
                this._getPageTab2()
            },
            handlePage(val) {
                this.currentPage = val;
                this._getPageTab2()
            },
            _getPageTab2() {
                getApplicationPage({current:this.currentPage,size:this.pageSize})
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
                getApplicationPageByValue({current:this.currentPage,size:this.pageSize},
                    this.sch_order,this.sch_status).then(res => {
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
            // add
            addTab() {
                this.$router.push({
                    path: "/website/application-page/application-edit-page?type=add"
                })
            },
            toSuccess(row) {
                updateStatusApplication({id:row.id,status:1}).then( res=>{
                    if(res.status === 'SUCCESS'){
                        this._getPageTab2();
                        this.$notify({
                            title: '成功',
                            message: '该信息已成功发布到网站',
                            type: 'success'
                        })

                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch(error => {
                    this.$message.error(error);
                });
            },
            // 下架
            toDelete(row) {
                updateStatusApplication({id:row.id,status:2}).then( res=>{
                    if(res.status === 'SUCCESS'){
                        this._getPageTab2();
                        this.$notify({
                            title: '成功',
                            message: '已下架该信息',
                            type: 'success'
                        })
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch(error => {
                    this.$message.error(error);
                });
            },
            // 编辑
            editTable(index, row) {
                this.$router.push({
                    path: "/website/application-page/application-edit-page?type=edit&id=" + row.id
                })
            },
        }
    }
</script>
<style lang="scss" scoped>
    .fyDiv {
        float: right;
        margin-top: 30px;
        padding-bottom: 20px;
    }
    .anoCard .el-table .el-button {
        padding: 8px 18px;
        font-size: 12px;
    }
    .searchDiv {
        margin-bottom: 20px;
        .el-button {
            padding: 11px 20px;
        }
    }
    .width1 {
        width: 180px;
        margin-right: 10px;
    }
    .diaForm {
        .el-input {
            width: 350px;
        }
    }
</style>
<style lang="scss">
    .anoCard {
        .el-card__body:after {
            content: '';
            clear: both;
            width: 0;
            height: 0;
            visibility: hidden;
            display: block;
        }
    }
    .diaForm .el-form-item__label {
        padding-right: 20px;
    }
    .searchDiv [class^='el-icon'] {
        color: #fff;
    }
</style>

