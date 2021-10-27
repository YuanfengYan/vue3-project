<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-10-27 11:11:11
-->
<template>
<el-form
    ref="ruleForm"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input
        v-model="ruleForm.pass"
        type="password"
        autocomplete="off"
      ></el-input>
    </el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>
<style scoped>
</style>
<script >
import {loginApi} from '@/api/user'
export default {
  data() {
    
    const validateEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input '))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        name: '',
      },
      rules: {
        name: [{ validator: validateEmpty, trigger: 'blur' }],
        pass: [{ validator: validateEmpty, trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
         loginApi(valid).then(res=>{
            console.log('loginApi',res)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
}
</script>