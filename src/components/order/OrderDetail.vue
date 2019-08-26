<template>
    <!--
        作者：邓宁宁
        时间：2018-09-27
        描述：订单页面
    -->
    <div class="orderDetail">

        <OrderTop></OrderTop>

        <div class="body">
            <!--收货地址-->
            <div class="address_info">
                <div class="address_info_title">
                    <h2>收货信息</h2>
                    <a href="/user/address">新增收货地址</a>
                </div>
                <div class="address_info_list">
                    <ul>
                        <li v-for="userAddress in userAddressList">
                            <div class="address_info_warp">
                                <p>
                                    {{userAddress.name}}
                                    <!--如果is_default字段为1就标记为默认地址-->
                                    <span v-if="userAddress.is_default === 1" class="defaultAddress">默认地址</span>
                                    <a href="javascript:;" class="updateAddress">修改</a>
                                </p>
                                <p>{{userAddress.telephone}}</p>
                                <p>
                                    <i class="area"></i>{{userAddress.province}}{{userAddress.city}}{{userAddress.town}}{{userAddress.area}}
                                </p>
                            </div>
                            <span class="address_select"></span>
                        </li>

                    </ul>
                </div>
            </div>

            <!--商品信息-->
            <div class="product_info">
                <div class="product_info_title">
                    <h2>商品清单</h2>
                    <a href="">返回购物袋修改商品</a>
                </div>
                <!--商品列表-->
                <div class="product_info_list">
                    <table cellpadding="0">
                        <tr class="p_desc_title">
                            <td>
                                <em>唯品会 发货订单</em>
                            </td>
                            <td>
                                <span>尺码</span>
                            </td>
                            <td>
                                <span>颜色</span>
                            </td>
                            <td>
                                <span>单价</span>
                            </td>
                            <td>
                                <span>数量</span>
                            </td>
                        </tr>
                        <tr class="p_desc" v-for="order in OrderList">
                            <td>
                                <img :src="'../../../static/product/'+order.product.defaultImage.image" alt=""/>
                                <div class="p_title">
                                    {{order.product.title}}
                                </div>
                            </td>
                            <td>{{order.productSize}}</td>
                            <td>{{order.productColor}}</td>
                            <td>￥{{order.product.price}}</td>
                            <td>{{order.productNumber}}</td>
                        </tr>

                    </table>
                </div>
                <!-- 总计-->
                <div class="order_total">
					<span>运费：
						<span class="order_freight">免运费 </span>
					</span>
                    <span>已享受优惠：-¥
						<span class="order_discount">119.70</span>
					</span>
                    <span>
						本组商品金额：
						<span class="total_money">¥777.30</span>
					</span>
                </div>
            </div>
            <!-- 支付信息-->
            <div class="pay_info">
                <h2>支付信息</h2>
                <div class="pay_method">
                    <h3>支付方式</h3>
                    <div class="method_online">
                        <input type="radio" value="在线支付" name="pay_method" id="online">
                        <label for="online">在线支付</label>
                        <div class="online_desc">
                            <p>
                                支持绝大多数银行卡、微信支付等，可在提交订单后选择。
                            </p>
                            <p>
                                如唯品金融、中国建设银行、中国工商银行、中国农业银行、中国银行、微信支付等
                            </p>
                        </div>
                    </div>
                    <div class="method_cod">
                        <input type="radio" value="货到付款" name="pay_method" id="cod">
                        <label for="cod">货到付款</label>
                        <div class="cod_desc">
                            <p>
                                支持绝大多数银行卡、微信支付等，可在提交订单后选择。
                            </p>
                            <p>
                                如唯品金融、中国建设银行、中国工商银行、中国农业银行、中国银行、微信支付等
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            <!--结算信息-->
            <div class="order_balance">
                <div class="order_balance_info">
                    <p>
                        <span>商品金额：</span><span>¥897</span>
                    </p>
                    <p>
                        <span>运费：</span><span>¥0</span>
                    </p>
                    <p>
                        <span>活动优惠： </span><span>¥89.7</span>
                    </p>
                    <p>
                        <span>待支付：</span><span class="order_pay">¥807.3</span>
                    </p>
                    <p>
                        <span>送货至：</span>
                        <span class="order_address">南开区 安安，哈哈，177*****107</span>
                    </p>
                </div>
                <div class="order_submit">
                    <span class="sub_btn" @click="goPayMent">提交订单</span>
                </div>
            </div>
        </div>

        <IndexFoot></IndexFoot>
    </div>
</template>

<script>
    import OrderTop from "../order/OrderTop"
    import IndexFoot from "../index/IndexFoot"

    export default {
        name: "orderDetail",

        data() {
            return {
                OrderList: '',
                userAddressList: '',
                idArray: [],
                address_id: "",
            }
        },
        methods: {
            getUserAddressList: function (userId) {
                fetch("/apis/user/findAllUserAddress/" + userId, {
                    method: "get",
                }).then(result => {
                    return result.json()
                }).then(data => {
                    if (data["code"] === 200) {
                        this.userAddressList = data["data"];
                    } else {
                        alert(data["msg"]);
                    }
                })
            },
            getGoodList: function (idList) {
                for (let i = 0; i < idList.length; i++) {
                    this.idArray[i] = idList[i].id;
                }
                fetch("/apis/goodCart/getGoodCartByIdList", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",//表单提交
                    },
                    body: "idList=" + this.idArray,
                }).then(result => {
                    return result.json()
                }).then(data => {
                    if (data["code"] === 200) {
                        this.OrderList = data["data"];
                    } else {
                        alert(data["msg"]);
                    }
                })
            },
            //创建订单，并跳转到支付页面
            goPayMent: function () {
                fetch("/apis/order/createdOrder", {
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "userId": this.$store.getters.getUser.id,
                        "goodCartList": this.OrderList,
                        "addressId": 1,
                        "productTotal": 1000,
                        "orderCount": this.idArray.length,
                    })
                }).then(result => {
                    return result.json()
                }).then(data => {
                    if (data["code"] === 200) {
                        // 跳转到支付页面
                        this.$router.push({
                            path: "/pay/payMethods",
                            query: {
                                orderNo: data["data"],
                            }
                        });
                    } else {
                        alert(data["msg"]);
                    }
                });
            }
        },
        mounted() {
            if (this.$store.getters.getUserState === "true") {
                this.getUserAddressList(this.$store.getters.getUser.id);
                this.getGoodList(JSON.parse(this.$route.query.list));
            } else {
                this.$router.push("/user/login");
            }
        },
        components: {
            OrderTop,
            IndexFoot,
        },
    }
</script>

<style scoped>
    .body {
        width: 1000px;
        margin: 50px auto;
    }

    .address_info {
        width: 100%;
    }

    .address_info_title {
        width: 970px;
        padding: 10px 15px;
        height: 18px;
        line-height: 18px;
        border: 1px solid #e2e2e2;
        border-left: 2px solid #f3168a;
        background-color: #f9f9f9;
    }

    .address_info_title > h2 {
        display: inline;
    }

    .address_info_title > a {
        float: right;
        color: #1d94d1;
    }

    .address_info_title > a:hover {
        color: rgb(60, 189, 255);
    }

    .address_info_list {
        margin-left: 30px;
        margin-top: 40px;
        width: 980px;
    }

    .address_info_list > ul {
        overflow: hidden;
    }

    .address_info_list > ul > li {
        width: 300px;
        height: 150px;
        margin: 0 20px 20px 0;
        border: 1px solid #d0d0d0;
        box-sizing: border-box;
        background: url(../../assets/order/sprites-y-hash-0476d4fe.png) repeat-x 0 -304px;
        font-size: 14px;
    }

    .address_info_list > ul > li:hover {
        background-position: 0 0;
    }

    .address_info_list > ul > li:hover .updateAddress {
        visibility: visible;
    }

    .address_info_warp {
        margin: 20px 20px 0 20px;
    }

    .address_info_warp > p {
        margin-bottom: 10px;
    }

    .address_info_warp > p:nth-child(1) {
        border-bottom: 1px dashed #999999;
    }

    .updateAddress {
        float: right;
        right: 50px;
        position: relative;
        visibility: hidden;
    }

    .defaultAddress {
        float: right;
    }

    .area {
        display: inline-block;
        width: 13px;
        height: 16px;
        background: url(../../assets/order/sprites-hash-c9711cec.png) -198px -123px;
        vertical-align: middle;
        margin-right: 3px;
    }

    .address_select {
        display: inline-block;
        width: 34px;
        height: 34px;
        background: url(../../assets/order/sprites-hash-c9711cec.png);
        background-position: -160px -116px;
        float: right;
    }

    .product_info {
        width: 100%;
        margin-top: 50px;
    }

    .product_info_title {
        width: 1000px;
        padding: 10px 15px;
        height: 40px;
        line-height: 18px; /*真的就是18px不要改!!!!!*/
        border: 1px solid #e2e2e2;
        border-left: 2px solid #f3168a;
        background-color: #f9f9f9;
        box-sizing: border-box;
    }

    .product_info_title > h2 {
        display: inline;
    }

    .product_info_title > a {
        float: right;
        color: #1d94d1;
    }

    .product_info_title > a:hover {
        color: rgb(60, 189, 255);
    }

    .product_info_list {
        width: 930px;
        margin: 0 auto;
    }

    .product_info_list > table {
        width: 100%;
        margin-top: 20px;
    }

    .p_desc_title {
        width: 100%;
        height: 30px;
    }

    .p_desc_title > td:nth-child(1) {
        width: 400px;
        margin-right: 100px;
        border-bottom: 1px solid #e0e0e0;
    }

    .p_desc_title > td:nth-child(2) {
        width: 112.5px;
        text-align: right;
        border-bottom: 1px solid #e0e0e0;
    }

    .p_desc_title > td:nth-child(3) {
        width: 112px;
        text-align: right;
        border-bottom: 1px solid #e0e0e0;
    }

    .p_desc_title > td:nth-child(4) {
        width: 112px;
        text-align: right;
        border-bottom: 1px solid #e0e0e0;
    }

    .p_desc_title > td:nth-child(5) {
        width: 112px;
        text-align: right;
        border-bottom: 1px solid #e0e0e0;
    }

    .p_desc_title em {
        font-weight: inherit;
        font-style: normal;
        font-size: 18px;
    }

    .p_desc_title span {
        color: grey;
    }

    .p_desc {
        width: 100%;
    }

    .p_desc > td:nth-child(1) {
        overflow: hidden;
        padding-top: 15px;
    }

    .p_desc > td:nth-child(2) {
        text-align: right;
    }

    .p_desc > td:nth-child(3) {
        text-align: right;
    }

    .p_desc > td:nth-child(4) {
        text-align: right;
    }

    .p_desc > td:nth-child(5) {
        text-align: right;
    }

    .p_desc img {
        width: 32px;
        height: 42px;
        float: left;
    }

    .p_title {
        width: 380px;
        height: 42px;
        margin-left: 20px;
        float: left;
    }

    .order_total {
        width: 100%;
        height: 30px;
        line-height: 30px;
        margin: 20px 0;
        border-top: 1px solid grey;
        text-align: right;
    }

    .order_total > span {
        margin-left: 20px;
        font-weight: 700;
    }

    .total_money {
        color: #f10180 !important;
    }

    .pay_info {
        margin: 30px 0;
        width: 100%;
        padding-bottom: 30px;
        border-bottom: 1px dashed grey;
    }

    .pay_info > h2 {
        display: block;
        width: 1000px;
        padding: 10px 15px;
        height: 40px;
        line-height: 18px; /*真的就是18px不要改!!!!!*/
        border: 1px solid #e2e2e2;
        border-left: 2px solid #f3168a;
        background-color: #f9f9f9;
        box-sizing: border-box;
    }

    .pay_method {
        margin: 30px 15px;
    }

    .method_online {
        width: 100%;
        height: 78px;
        margin-top: 20px;
        border: 1px solid rgb(124, 191, 19);
        border-radius: 2px;
        background: rgb(252, 254, 249);
        cursor: pointer;
    }

    .method_online > input {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin: 20px 20px 0 20px;
        float: left;
    }

    .method_online > label {
        display: inline-block;
        height: 20px;
        margin: 20px 20px 0 0;
        float: left;
        cursor: pointer;
    }

    .online_desc {
        margin-top: 20px;
        color: #999;
    }

    .method_cod {
        width: 100%;
        height: 78px;
        margin-top: 20px;
        border: 1px solid rgb(124, 191, 19);
        border-radius: 2px;
        background: rgb(252, 254, 249);
        cursor: pointer;
    }

    .method_cod > input {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin: 20px 20px 0 20px;
        float: left;
    }

    .method_cod > label {
        display: inline-block;
        height: 20px;
        margin: 20px 20px 0 0;
        float: left;
        cursor: pointer;
    }

    .cod_desc {
        margin-top: 20px;
        color: #999;
    }

    .order_balance {
        width: 100%;
        height: 200px;
        border: 1px solid rgb(224, 224, 224);
        box-sizing: border-box;
    }

    .order_balance_info {
        /*height:150px*/
        padding-top: 20px;
        padding-right: 20px;
        height: 130px;
        text-align: right;
    }

    .order_balance_info > p {
        margin-bottom: 5px;
    }

    .order_balance_info > p > span:not(.order_address) {
        display: inline-block;
        width: 100px;
    }

    /*.order_address{
        width: ;
    }*/
    .order_submit {
        width: 100%;
        height: 50px;
        background: rgb(240, 240, 240);
    }

    .sub_btn {
        display: block;
        width: 250px;
        height: 50px;
        line-height: 50px;
        background-color: #f10180;
        color: white;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
        float: right;
    }

</style>
