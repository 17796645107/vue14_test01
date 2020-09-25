<template>
    <header>
        <div class="head_warp">
            <div class="logo" @click="goIndex">
            </div>
            <div class="head_nav">
                <div class="user_info">
                    <span>你好，<a href="/user/index">{{user.nickname}}</a></span>
                    <i title="等级：铁牌会员"></i>
                    <a href="javascript:;" @click="Logout" class="logout">[退出]</a>
                    <a href="/user/index" class="order">订单管理</a>
                </div>
                <div class="telephone">
                    400-6789-888
                </div>
                <div class="online_service">
                    在线客服
                </div>
                <div class="vip_service">
                    会员服务
                </div>
                <div class="service">
                    <ul>
                        <li>
                            <i></i>100%正品保证
                        </li>
                        <li>
                            <i></i>七天无理由放心退
                        </li>
                        <li>
                            <i></i>退货返运费
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: "OrderTop",
        data() {
            return {
                user: "",
            }
        },
        methods: {
            //用户注销
            Logout: function () {
                this.$store.commit('userLogout');
                //刷新界面
                window.location.reload();
            },
            goIndex: function () {
                this.$router.push("/index");
            }
        },
        created() {
            if (this.$store.getters.getUserState === "true") {
                this.user = this.$store.getters.getUser;
            } else {
                this.$router.push("/user/login");
            }
        },
    }
</script>

<style scoped>
  li{
    float: left;
  }
    header {
        width: 100%;
        margin-bottom: 30px;
        height: 78px;
        border-bottom: 2px solid #f3168a;

    }

    .head_warp {
        width: 1000px;
        height: 100%;
        margin: 0 auto;
    }

    .logo {
        width: 100px;
        height: 60px;
        margin-top: 20px;
        background: url(../../assets/index/logo.png)  no-repeat;
      background-size: cover;
        float: left;
    }

    .head_nav {
        margin-top: 10px;
        float: right;
    }

    .user_info, .telephone, .online_service, .vip_service {
        display: inline-block;
        height: 20px;
    }

    .user_info {
        color: grey;
    }

    .user_info > i {
        width: 16px;
        height: 21px;
        display: inline-block;
        background-image: url(../../assets/user/i-level-small.png);
        background-repeat: no-repeat;
        vertical-align: middle;
    }

    .user_info a {
        color: grey;
    }

    .logout {
        margin: 0 15px;
    }

    .telephone {
        width: 86px;
        height: 14px;
        line-height: 14px;
        padding: 0 10px;
        color: grey;
        border-left: 1px solid grey;
        border-right: 1px solid grey;
        text-align: center;
        margin: 0 5px;
    }

    .online_service {
        width: 68px;
        height: 14px;
        line-height: 14px;
        padding: 0 10px 0 0;
        color: grey;
        border-right: 1px solid grey;
        text-align: center;
        margin: 0 5px;
    }

    .vip_service {
        color: grey;
    }

    .service {
        margin-top: 10px;
        width: 420px;
        height: 20px;
    }

    .service li:nth-child(1) > i {
        display: inline-block;
        width: 27px;
        height: 25px;
        background: url(../../assets/goodCart/1.png);
        margin-right: 10px;
        vertical-align: middle;
    }

    .service li:nth-child(2) > i {
        display: inline-block;
        width: 27px;
        height: 25px;
        background: url(../../assets/goodCart/3.png);
        margin: 0 10px 0 20px;
        vertical-align: middle;
    }

    .service li:nth-child(3) > i {
        display: inline-block;
        width: 27px;
        height: 25px;
        background: url(../../assets/goodCart/2.png);
        margin: 0 10px 0 20px;
        vertical-align: middle;
    }
</style>
