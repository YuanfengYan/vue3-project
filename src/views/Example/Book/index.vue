<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-07-29 16:02:54
-->
<template>

    <div class="bookwarp">
      
        <el-table :data="list" style="width: 100%" max-height="600">
            <el-table-column fixed prop="name" label="书名" width="200" />
            <el-table-column prop="id" label="序号" width="150" />
            <el-table-column prop="author" label="作者" width="150" />
            <el-table-column prop="catroy" label="类型" width="120" />
            <el-table-column prop="des" label="描述" width="400" />
            <el-table-column fixed="right" label="操作" width="300">
                <template #default="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click.prevent="deleteRow(scope, list)"
                    >
                        删除
                    </el-button>
                    <el-button
                        type="text"
                        size="small"
                        @click.prevent="editRow(scope, tableData)"
                    >
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<style lang="scss" scope>
@import './style.scss';
</style>
<script lang="ts">
// import { ElMessage } from 'element-plus'
import { defineComponent, onMounted } from 'vue';
import books from "@/composables/book/bookList"

export default defineComponent({
    data() {
        return {};
    },
    methods: {
      deleteRow(item:any,table:any){
        console.log(item)
        table.splice(item.$index,1)
        
      },
      editRow(item:any){
         console.log(item)
        item.row.des='des'
        this.changeList()
      }
    },
    created() {},
    mounted() {},
    unmounted() {},
    setup() {
       const { list, getBooks,changeList } = books()
       onMounted(()=>{
         getBooks()
       })
       return {
         list,
         getBooks,
         changeList
       }
    },
});
</script>
