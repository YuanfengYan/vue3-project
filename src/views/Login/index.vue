<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-01-01 13:53:42
-->
<template>
<div class="pagewarp">
    <div class="login">
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
                <el-form-item label="密码" prop="pass">
                    <el-input
                        v-model="ruleForm.pass"
                        type="password"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                    >登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>
<style lang="scss" scoped>
@import "./style.scss";
</style>
<script lang="ts">

// import { ElMessage } from 'element-plus'
import { defineComponent } from 'vue';
// import { loginApi } from '@/api/user';

export default defineComponent({
    data() {
        const validateEmpty = (rule: any, value: any, callback: Function) => {
            if (value === '') {
                callback(new Error('Please input '));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                pass: 'admin',
                name: 'admin',
            },
            rules: {
                name: [{ validator: validateEmpty, trigger: 'blur' }],
                pass: [{ validator: validateEmpty, trigger: 'blur' }],
            },
            redirect:""
        };
    },
    methods: {
        submitForm(formName: any) {
            let el: any = this.$refs[formName];
            el.validate((valid: boolean) => {
                if (valid) {
                  this.$store.dispatch('user/login', this.ruleForm).then(()=>{

                    this.$router.push('/home').catch(() => {})
                  })
                    // loginApi({
                    //   name:this.ruleForm.name,
                    //   pass:this.ruleForm.pass,
                    // }).then((res) => {
                    //   if(res){
                    //     ElMessage({
                    //       message: '登陆成功',
                    //       type: 'success',
                    //     })
                    //     this.$router.push('/home')
                    //   }
                    // });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
    watch: {
      $route: {
        handler(route) {
          this.redirect = (route.query && route.query.redirect) || '/'
        },
        immediate: true,
      },
    },
    setup() {},
});
</script>
