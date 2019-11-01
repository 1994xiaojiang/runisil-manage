<template>
    <div>
        <div v-if="secondpage" class="className">
            <el-card class="anoCard">
                <div slot="header">
                    <span style="font-weight: 600;font-size: 20px;">新闻列表</span>
                </div>
                <div class="searchDiv">
                    <el-input type="text" placeholder="请输入新闻标题" class="width1" v-model="sch_str"></el-input>
                    <el-select v-model="sch_status" clearable class="width1" placeholde="请选择状态">
                        <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                    <el-button type="primary" icon="el-icon-search" @click="searchNews">搜索</el-button>
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addNews">新建</el-button>
                </div>

                <el-table :data="tableData" border stripe>
                    <el-table-column prop="id" label="新闻ID" width="70"></el-table-column>
                    <el-table-column prop="editor" label="作者" width="150"></el-table-column>
                    <el-table-column prop="editorEmail" label="作者邮箱"></el-table-column>
                    <el-table-column prop="editorPhone" label="作者电话" width="150"></el-table-column>
                    <el-table-column prop="newsSubject" label="新闻主题" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="releaseTime" label="新闻发布时间"></el-table-column>
                    <el-table-column prop="newsStatus" label="状态" width="80">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.newsStatus | tagClass">
                                {{scope.row.newsStatus | statusText}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="editTable(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="success" @click="relesaseNews(scope.row)"
                                       :disabled="scope.row.newsStatus === 1">发布</el-button>
                            <el-button type="danger" @click="toDelete(scope.row)"
                                       :disabled="!(scope.row.newsStatus === 1 && scope.row.newsStatus !== 0)">下架</el-button>
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
    import {getNewsByPage,relesaseNews,toDelete,searchNews} from '@/api/news'
    export default {
        name: "news-page",
        data(){
            return{
                tableData: [],
                sch_str: '',
                sch_status: null,
                currentPage: 1,
                pageSize: 10,
                total: 0,
                pageSizes: [10, 20, 30, 40],
                options: [
                    { label: '草稿', value: 0 },
                    { label: '发布', value: 1 },
                    { label: '下架', value: 2 }
                ],
            }
        },
        mounted() {
            this.getNewsByPage();
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
        computed:{
            secondpage(){
                return this.$store.state.secondpage;
            }
        },
        watch: {
            $route(to, from) {
                if(to.path === '/runisil-manager/website/news-page'){
                    this.getNewsByPage()
                }
            }
        },
        methods:{
            getNewsByPage(){
                getNewsByPage({current:this.currentPage,size:this.pageSize}).then(res=>{
                    if(res.status === 'SUCCESS'){
                        this.tableData = res.data.records;
                        this.total = res.data.total
                    }else{
                        this.$message.error(res.msg)
                    }
                }).catch(error => {
                    this.$message.error(error.msg)
                })
            },
            addNews(){
                this.$router.push({
                    path: "/runisil-manager/website/news-page/news-edit-page?type=add"
                })
            },
            searchNews(){
                searchNews({current:this.currentPage,size:this.pageSize},this.sch_str,this.sch_status).then(res=>{
                    if(res.status === 'SUCCESS'){
                        this.tableData = res.data.records;
                        this.total = res.data.total
                    }else{
                        this.$message.error(res.message)
                    }
                }).catch(error=>{
                    this.$message.error(error.message)
                })
            },
            relesaseNews(data){
                relesaseNews(data).then(res=>{
                    if(res.status === 'SUCCESS'){
                        this.getNewsByPage();
                        this.$notify({
                            title: '成功',
                            message: '该新闻已成功发布到网站',
                            type: 'success'
                        })

                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch(error=>{
                    this.$message.error(error.msg);
                })
            },
            editTable(indes,data){
                this.$router.push({
                    path: "/runisil-manager/website/news-page/news-edit-page?type=edit&newsId=" + data.id
                })
            },
            toDelete(data){
                toDelete(data).then(res=>{
                    if(res.status === 'SUCCESS'){
                        this.getNewsByPage();
                        this.$notify({
                            title: '成功',
                            message: '该新闻已从网站下架',
                            type: 'success'
                        })

                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch(error=>{
                    this.$message.error(error.msg);
                })
            },
            handleSize(val) {
                this.pageSize = val;
                this.getNewsByPage()
            },
            handlePage(val) {
                this.currentPage = val;
                this.getNewsByPage()
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


