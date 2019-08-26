<template>
    <!--
      时间：2018-11-22
    -->
    <div class="UserLogin">

        <!--头部-->
        <user_head></user_head>

        <div class="main">
            <div class="main_warp">
                <div class="login_warp">
                    <div class="login_nav">
                        <div class="code_login">
                            <span>扫码登录</span>
                        </div>
                        <div class="account_login">
                            <span>账户登录</span>
                        </div>
                    </div>
                    <div class="login_form">
                        <div class="username">
                            <i class="el-icon-user"></i><input type="text" v-model="telephone" @click="showUsernameList"
                                                               @blur="hiddenUsernameList" placeholder="手机号"
                                                               required="required"/>
                            <div v-bind:class="{usernameList:true,usernameListHidden:usernameListShow}">
                                <ul>
                                    <li v-for="user in UsernameCookie" @mouseover="fillUsername(user)">
                                        {{user[0]}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="password">
                            <i class="el-icon-unlock"></i><input type="password" v-model="password" placeholder="密码"
                                                                 required="required" @keyup.enter="userLogin"/>
                        </div>
                        <div class="group">
                            <div class="remember_username">
                                <input type="checkbox" id="r_username" v-model="checkBox"/>
                                <label for="r_username">记住密码</label>
                            </div>
                            <div class="forget_password">
                                <a href="">忘记密码</a>
                            </div>
                        </div>
                        <input type="button" class="login_submit" :value="loginText" @click="userLogin"/>
                    </div>
                    <div class="other">
                        <div class="weChat">
                            <a href=""><span></span></a>
                        </div>
                        <div class="other_list">
                            <ul>
                                <li><a href="">新浪微博</a></li>
                                <li><a href="">QQ</a></li>
                                <li><a href="">支付宝</a></li>
                                <li><a href="">更多</a></li>
                                <li><a href="/user/register">免费注册</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--底部-->
        <user_foot></user_foot>
    </div>
</template>

<script>
    import UserHead from './UserHead'
    import UserFoot from './UserFoot'
    import {store} from "../../store/store";

    export default {
        name: "UserLogin",
        data: function () {
            return {
                telephone: "",
                password: "",
                checkBox: "true",
                UsernameCookie: [],//list
                usernameListShow: true,//是否展示,true:不显示,false显示.默认不显示
                loginText: "登录",
            }
        },
        methods: {
            //填充账号和密码
            fillUsername: function (user) {
                this.telephone = user[0];
                this.password = user[1];
                this.checkBox = true;//默认选中记住密码
            },
            //展示所有储存在Cookie中用户
            showUsernameList: function () {
                let cookieValue = this.$cookies.get("users");
                if (cookieValue == null) {
                    this.usernameListShow = true;
                } else {
                    let users = JSON.parse(cookieValue);
                    this.UsernameCookie = users;
                    this.usernameListShow = false;
                }
            },
            hiddenUsernameList: function () {
                this.usernameListShow = true;
            },

            //判断字符串是否为空
            emptyString: function (str) {
                return (str === "" || str.trim().length === 0);
            },

            userLogin: function () {
                //检查用户名或密码是否为空
                if (this.emptyString(this.telephone) && this.emptyString(this.password)) {
                    alert("请输入用户名或密码");
                    return;
                }
                this.loginText = "登录中...";
                //发送登录请求
                fetch("/apis/user/login",
                    {
                        method: "post",
                        //一定要写请求头,指定请求类型为json
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "telephone": this.telephone,
                            "pwd": this.password,
                        })
                    }).then(result => {
                    return result.json();
                }).then(data => {
                    //登录成功
                    if (data["code"] === 200) {
                        //保存用户信息到Vuex
                        this.$store.commit('saveUser', data["data"]);
                        //记住密码
                        this.setUserToCookie();
                        //路由跳转,返回上一级页面
                        this.$router.go(-1);
                    } else {
                        //登录失败
                        this.loginText = "登录";
                        alert(data["msg"]);
                    }
                })
            },
            //记住密码
            setUserToCookie: function () {
                //从Cookie中取出用户信息
                let users = JSON.parse(this.$cookies.get("users"));
                let userMap = new Map();
                //Cookie中不存在用户信息
                if (users == null) {
                    //如果勾选了记住密码
                    if (this.checkBox === true || this.checkBox === "true") {
                        userMap.set(this.telephone, this.password);
                    } else {
                        userMap.set(this.telephone, '');
                    }
                } else {
                    //Cookie存在用户信息
                    let telephoneFlag = false;//是否已经存在此账号
                    //遍历用户信息,查看是否已经存在此账号
                    for (let i = 0, l = users.length; i < l; i++) {
                        //如果用户名已经存在,则标记,并覆盖掉原来的用户和密码
                        if (users[i][0] === this.telephone) {
                            telephoneFlag = true;
                            userMap.set(this.telephone, this.password);
                        } else {
                            userMap.set(users[i][0], users[i][1]);
                        }
                    }
                    //如果没有存在此账号,则添加
                    if (!telephoneFlag) {
                        //如果勾选了记住密码
                        if (this.checkBox === true || this.checkBox === "true") {
                            userMap.set(this.telephone, this.password);
                        } else {
                            userMap.set(this.telephone, '');
                        }
                    }
                }
                //添加到Cookie中
                this.$cookies.set("users", JSON.stringify(userMap), 60 * 60 * 24 * 7);
            }
        },
        components: {
            "user_head": UserHead,
            "user_foot": UserFoot
        }
    }
</script>

<style scoped>
    .main {
        width: 100%;
        height: 650px;
        background: url(../../assets/user/15290438491111.jpg) -300px;
    }

    .main_warp {
        width: 1000px;
        height: 450px;
        margin: 0 auto;
        padding-top: 50px;
    }

    .login_warp {
        width: 360px;
        height: 100%;
        background: white;
        float: right;
    }

    .login_nav {
        width: 100%;
        height: 50px;
        overflow: hidden;
        border-bottom: 1px solid rgb(224, 224, 224);
    }

    .code_login {
        width: 50%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        float: left;
        font-weight: 900;
    }

    .code_login:after {
        content: "|";
        left: 50px;
        position: relative;
        font-weight: 100;
    }

    .account_login {
        width: 50%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        float: right;
        font-weight: 900;
    }

    .login_form {
        width: 300px;
        height: 230px;
        padding-top: 40px;
        margin: 0 auto;
    }

    .username, .password {
        width: 290px;
        height: 35px;
        border: rgb(178, 178, 178) solid 1px;
        border-radius: 3px;
        margin-bottom: 20px;
        padding: 5px;
    }

    .username > input, .password > input {
        width: 220px;
        height: 32px;
        line-height: 32px;
        border: 0;
        font-size: 14px;
    }

    .username > i, .password > i {
        display: inline-block;
        width: 20px;
        height: 20px;
        font-size: 20px;
        vertical-align: middle;
        padding-right: 10px;
    }

    .usernameList {
        width: 300px;
        height: 200px;
        border: 1px solid grey;
        position: absolute;
        float: left;
        z-index: 1;
        background: white;
    }

    .usernameList ul li {
        width: 100%;
        height: 35px;
        line-height: 35px;
        font-size: 14px;
        padding-left: 35px;
        box-sizing: border-box;
    }

    .usernameList ul li:hover {
        background-color: rgb(241, 1, 128);
    }

    .usernameListHidden {
        display: none;
    }

    .group {
        width: 100%;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
    }

    .remember_username {
        height: 20px;
        float: left;
    }

    .remember_username > input {
        width: 16px;
        height: 16px;
        /*display: inline-block;
          border: 1px solid rgb(184,184,184);*/
    }

    .remember_username > label {
        width: 60px;
        height: 14px;
        display: inline-block;
        line-height: 14px;
        font-size: 12px;
        top: -5px;
        left: 10px;
        position: relative;
    }

    .forget_password {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        float: right;
    }

    .forget_password > a {
        color: #333;
    }

    .forget_password > a:hover {
        color: rgb(241, 1, 159);
    }

    .login_submit {
        width: 300px;
        height: 45px;
        border: 0;
        border-radius: 3px;
        background: rgb(241, 1, 128);
        color: white;
        font-size: 18px;
        margin-top: 30px;
        cursor: pointer;
    }

    .other {
        width: 300px;
        height: 80px;
        margin: 25px auto;
    }

    .weChat {
        width: 100%;
        height: 40px;
    }

    .weChat > a {
        width: 40px;
        height: 40px;
        display: inline-block;
        /*top:-20px;*/
        left: 130px;
        position: relative;
    }

    .weChat > a > span {
        width: 40px;
        height: 40px;
        display: inline-block;
        background: url(../../assets/user/sprites-hash-701a8168.png) -300px -161px;
    }

    .weChat > a:after {
        content: "";
        width: 122px;
        height: 1px;
        display: inline-block;
        background: rgb(224, 224, 224);
        top: -35px;
        left: -130px;
        position: relative;
        z-index: 0;
    }

    .weChat > a > span:after {
        content: "";
        width: 122px;
        height: 1px;
        display: inline-block;
        background: rgb(224, 224, 224);
        top: 5px;
        left: 50px;
        position: relative;
        z-index: 0;
    }

    .other_list {
        width: 100%;
        height: 24px;
        margin-top: 20px;
    }

    .other_list > ul {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .other_list li {
        width: 60px;
        height: 24px;
    }

    .other_list li > a {
        width: 60px;
        height: 24px;
        line-height: 24px;
        display: inline-block;
        font-size: 12px;
        color: #333;
        text-align: center;
    }
</style>
