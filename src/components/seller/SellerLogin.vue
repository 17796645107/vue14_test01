<template>
    <div class="SellerLogin">
        <div class="login_bar">
            <h1>商户登录</h1>
            <div class="username_form">
                <i class="el-icon-user"></i>
                <div class="username">
                    <el-input v-model="username" placeholder="请输入您的用户名" size="mini" class="username_input"></el-input>
                </div>
            </div>
            <div class="password_form">
                <i class="password_icon"><img src="../../assets/seller/password.png" alt=""></i>
                <div class="password">
                    <el-input v-model="password" placeholder="请输入您的密码" size="mini" class="password_input"
                              show-password></el-input>
                </div>
            </div>
            <el-button type="primary" size="mini" class="submit" @click="login">登录</el-button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "SellerLogin",
        data() {
            return {
                username: "",
                password: "",
            }
        },
        methods: {
            login: function () {
                fetch("/apis/seller/login", {
                    method: "post",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({"sellerUsername": this.username, "sellerPassword": this.password})
                }).then(value => value.json())
                    .then(data => {
                        if (data["code"] === 200) {

                        } else {
                            this.$message(data["msg"]);
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .SellerLogin {
        height: 600px;
        padding: 70px 0 0;
        background-color: #1d94d1;
    }

    .login_bar {
        width: 300px;
        height: 350px;
        margin: 0 auto;
        background: white;
        border-radius: 5px;
        padding: 100px 40px 0;
    }

    .username_form {
        margin-top: 20px;
        overflow: hidden;
    }

    .password_form {
        margin-top: 40px;
        overflow: hidden;
    }

    .username, .password {
        display: inline-block;
        margin-left: 10px;
    }

    .el-icon-user {
        width: 20px;
        height: 20px;
        font-size: 20px;
        vertical-align: middle;
    }

    .password_icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle;
    }

    .password_icon > img {
        width: 100%;
        height: 100%;
    }

    .username_input, .password_input {
        width: 230px;
    }

    .submit {
        width: 200px;
        margin: 50px 50px;
    }
</style>
