<template>
  <div class="">
    <el-upload
      class="avatar-uploader"
      action="https://up-z0.qiniup.com/"
      :show-file-list="false"
      :data="{ token }"
      :on-success="handleUploadSuccess"
    >
      <img
        v-if="ruleForm.img"
        width="80"
        height="80"
        :src="ruleForm.img"
        class="avatar"
      />
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
    <!-- <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="title" label="文章标题" width="150" />
      <el-table-column prop="sort_order" label="文章图片" align="center" #default="scope">
        <img :src="scope.row.img_url" width="80" height="80" alt="" />
      </el-table-column>
      <el-table-column
        prop="admin_info.nickname"
        label="作者"
        width="80"
        align="center"
      />
      <el-table-column prop="category_info.name" label="分类" align="center" />
      <el-table-column label="操作" #default="scope">
        <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)"
          >编辑</el-button
        >
        <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)"
          >删除</el-button
        >
      </el-table-column>
    </el-table> -->
  </div>
</template>

<script>
import { getToken } from "@/api/blog/upload";
export default {
  name: "CategoryCreate",
  data() {
    return {
      token: "",
      ruleForm: {
        img: "",
        listLoading: false,
      },
    };
  },
  mounted() {
    this.getUploadToken();
  },
  methods: {
    // 获取上传token
    async getUploadToken() {
      try {
        const res = await getToken();
        this.token = res.data.token;
        // this.getImagesList();
      } catch (err) {
        console.log(err);
      }
    },
    // 上传图片成功回调
    handleUploadSuccess(file) {
      this.ruleForm.img = `https://qiniu.kananana.cn/${file.key}`;
      this.$message.success("上传成功!");
    },
    // async getImagesList() {
    //   let url = `https://rsf-z0.qiniuapi.com/list?bucket=kanananablog`;
    //   let xhr = new XMLHttpRequest();
    //   xhr.onreadystatechange = function () {
    //     if (xhr.readyState == 4) {
    //       console.log(xhr.responseText);
    //     }
    //   };
    //   xhr.open("GET", url, true);
    //   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //   xhr.setRequestHeader("Authorization", "Qiniu " + this.token);
    //   xhr.send();
    // },
  },
};
</script>

<style scoped></style>
