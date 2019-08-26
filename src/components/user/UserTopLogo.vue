<!--
    @Author 邓宁
    @Date Created in 9:37 2019/8/22
    @Description
-->
<template>
    <div class="UserTopLogo">
        <div class="logo">
            <img src="../../assets/index/logo.png" alt="logo" @click="goIndex">
        </div>

        <div class="goodCart">
            <i></i><a href="javascript:void(0);" @click="goGoodCart">购物车</a><span
                class="cart_number">{{cartNumber}}</span>
            <div class="goodCart_hidden" v-show="userState && cartNumber !== 0">
                <ul>
                    <li v-for="goodCart in goodCartList">
                        <div class="productImage">
                            <img :src="'../../static/product/'+goodCart.product.defaultImage.image" alt="">
                        </div>
                        <div class="productDetail">
                            <div class="productTitle">
                                {{goodCart.product.title}}
                            </div>
                            <div class="colorAndSize">
                                {{goodCart.productColor}} {{goodCart.productSize}}
                            </div>
                        </div>
                        <div class="productPrice">
                            <span>¥{{goodCart.product.price}}</span>X{{goodCart.productNumber}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="service">
            <img src="../../assets/index/logoService.png"/>
        </div>
    </div>

</template>

<script>
    export default {
        name: "UserTopLogo",
        data() {
            return {
                cartNumber: 0,
                goodCartList: "",
                userState: false,//用户登录标记
            }
        },
        computed: {
            //获取用户登录状态
            getUserState() {
                return this.$store.getters.getUserState;
            },
            getUser() {
                return this.$store.getters.getUser;
            }
        },
        methods: {
            goIndex:function(){
                this.$router.push("/index");
            },
            goGoodCart: function () {
                if (this.getUserState === "true") {
                    this.$router.push('/goodCart');
                } else {
                    alert("请先登录！");
                    this.$router.push('/user/login');
                }
            },
            showSearch: function () {
                this.searchHistoryShow = true;
            },
            hideSearch: function () {
                this.searchHistoryShow = false;
            },
            getGoodCartList: function () {
                fetch("/apis/goodCart/getGoodCart/" + this.getUser.id, {
                    method: "get",
                }).then(result => {
                    return result.json()
                }).then(data => {
                    if (data["code"] === 200) {
                        this.goodCartList = data["data"];
                    } else {
                        alert(data["msg"]);
                    }
                })
            },
            //获取购物车中的记录数
            getCartCount: function () {
                fetch("/apis/goodCart/getCartCount/" + this.getUser.id, {
                    method: "get",
                }).then(result => {
                    return result.json()
                }).then(data => {
                    if (data["code"] === 200) {
                        this.cartNumber = data["data"];
                        this.$emit("putCartCount", data["data"]);
                    } else {
                        alert("错误信息:" + data["msg"]);
                    }
                });
            }
        },
        mounted() {
            //如果用户已经登录,则
            if (this.getUserState === "true") {
                this.getGoodCartList();
                this.getCartCount();
                this.userState = true;
            }
        },
    }
</script>

<style scoped>
    .UserTopLogo {
        width: 1000px;
        margin: 0 auto;
        height: 100px;
        overflow: hidden;
    }

    .logo {
        float: left;
    }

    .logo {
        width: 160px;
        height: 100%;
    }

    .logo > img {
        width: 100%;
        height: 100%;
    }

    .service {
        width: 304px;
        height: 100%;
        float: right;
    }

    .service > img {
        width: 100%;
        height: 100%;
    }

    .goodCart {
        float: right;
        width: 94px;
        height: 32px;
        margin-top: 33px;
        border: rgb(204, 204, 204) 1px solid;
        background-color: rgb(246, 247, 249);
    }

    .goodCart:hover .goodCart_hidden {
        visibility: visible;
    }

    .goodCart_hidden {
        width: 300px;
        max-height: 300px;
        position: absolute;
        background: white;
        margin-left: -227px;
        margin-top: 12px;
        border: 1px solid #CDCDCD;
        visibility: hidden;
        padding: 20px 10px;
        /*超过最大高度出现垂直滚动条*/
        overflow: auto;
    }

    .goodCart_hidden > ul {
        overflow: hidden;
    }

    .goodCart_hidden > ul > li {
        overflow: hidden;
        margin-bottom: 5px;
    }

    .goodCart_hidden > ul > li > div {
        float: left;
    }

    .productImage {
        width: 64px;
        height: 64px;
        border: 1px solid green;
        margin-right: 10px;
    }

    .productImage > img {
        width: 100%;
        height: 100%;
    }

    .productDetail {
        width: 130px;
        height: 100%;
    }

    .productTitle {
        width: 100%;
        height: 38px;
        overflow: hidden;
    }

    .colorAndSize {
        color: #999;
    }

    .productPrice {
        width: 50px;
        height: 100%;
        color: #999;
        margin-left: 20px;
    }

    .productPrice > span {
        margin-right: 5px;
        color: black;
    }

    .goodCart > i {
        width: 12px;
        height: 17px;
        display: inline-block;
        top: 8px;
        left: 8px;
        position: relative;
        background: url(../../assets/index/resource1.png) -114px -208px;
    }

    .goodCart > a {
        top: 5px;
        left: 12px;
        position: relative;
        color: black;
    }

    .cart_number {
        width: 15px;
        height: 15px;
        line-height: 15px;
        text-align: center;
        display: inline-block;
        border-radius: 5px;
        background: rgb(240, 5, 129);
        top: 5px;
        right: -15px;
        position: relative;
        color: white;
    }
</style>