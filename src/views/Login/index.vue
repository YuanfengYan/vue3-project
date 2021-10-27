<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-10-27 16:16:02
-->
<template>
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
</template>
<style lang="scss" >
@import "./style.scss";
</style>
<script lang="ts">
import { defineComponent } from 'vue';
import { loginApi } from '@/api/user';

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
                pass: '',
                name: '',
            },
            rules: {
                name: [{ validator: validateEmpty, trigger: 'blur' }],
                pass: [{ validator: validateEmpty, trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm(formName: any) {
            let el: any = this.$refs[formName];
            el.validate((valid: boolean) => {
                if (valid) {
                    loginApi(valid).then((res) => {
                        console.log('loginApi', res);
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
    setup() {},
});
</script>
