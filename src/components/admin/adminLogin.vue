<!--
    @Author 邓宁
    @Date Created in 10:49 2019/9/3
    @Description
-->
<template>
    <div class="adminLogin">
        <el-card class="form_layout">
            <el-form>
                <el-form-item>
                    <i>账户：</i><el-input v-model="username"></el-input>
                    <i>密码：</i><el-input type="password" v-model="password"></el-input>
                    <el-button type="primary" class="login_btn" @click="adminLogin">登陆</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <div class="bgImage">
            <img src="../../assets/admin/login_center_bg.5307896.png" alt="">
        </div>
    </div>

</template>

<script>
    export default {
        name: "adminLogin",
        data(){
            return{
                username:"",
                password:"",
            }
        },
        methods:{
            adminLogin:function(){
                console.log(this.username);
                console.log(this.password);
            }
        },

    }
</script>

<style scoped>
    .adminLogin{
        width: 100%;
    }
    .bgImage{
        margin-top: 200px;
        width: 100%;
        height: 240px;
    }
    .bgImage > img{
        width: 100%;
        height: 100%;
        background: #409eff;
    }
    .form_layout{
        position: absolute;
        left: 0;
        right: 0;
        width: 360px;
        margin: -60px auto;
        border-top: 10px solid #409eff;
    }
    .login_btn{
        margin-top: 30px;
        width: 100%;
    }
</style>