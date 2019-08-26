<template>
    <!--
         created by : 邓宁宁
         Date : 2019/4/18 22:32
    -->
    <div class="payMethods">
        <OrderTop></OrderTop>

        <div class="body">
            <div class="context">
                <p>
                    <i></i>订单提交成功，还差一步就抢到心爱的商品，快快支付吧~
                </p>
                <p>
                    共1张订单， <a href="">订单详情</a>。 请在19分13秒内完成支付。
                    <span>待支付：<b>¥522</b></span>
                </p>
            </div>
            <div class="options">
                <div class="options_top">
                    <div class="bankCart_option" @click="changeBankCart">使用银行卡</div>
                    <div class="weChat_option" @click="changeWeChat">微信等平台</div>
                </div>
                <div class="method_bank" v-show="showBankCart">
                    <div class="bankCartNumber">
                        <input type="text" placeholder="输入银行卡号进行智能识别"/><a href="">确定</a>
                    </div>

                    <div class="bankList">
                        <p>或直接选择银行：</p>
                        <ul>
                            <li>中国建设银行</li>
                            <div class="cartSelect_hidden">
                                <a>储蓄卡</a>
                                <a>信用卡</a>
                            </div>
                            <li>中国工商银行</li>
                            <li>中国银行</li>
                            <li>平安银行</li>
                            <li>中国建设银行</li>
                            <li>中国工商银行</li>
                            <li>中国银行</li>
                            <li>平安银行</li>
                        </ul>
                    </div>
                </div>
                <div class="method_weChat" v-show="showWeChat" @click="toPay">
                    <div class="weChat_btn">
                    </div>
                </div>
            </div>
            <div class="pay_warp">
                <button class="pay_submit">前往支付</button>
            </div>
        </div>

        <IndexFoot></IndexFoot>
    </div>
</template>

<script>
    import OrderTop from '../order/OrderTop'
    import IndexFoot from '../index/IndexFoot'

    export default {
        name: "payMethods",
        data() {
            return {
                showWeChat: false,
                showBankCart: true,
                order_no: '',
                order: "",
            }
        },
        methods: {
            changeBankCart: function () {
                this.showBankCart = true;
                this.showWeChat = false;
            },
            changeWeChat: function () {
                this.showBankCart = false;
                this.showWeChat = true;
            },
            //支付请求
            toPay: function () {
                fetch("/apis/pay/payment", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",//表单提交
                    },
                    body: "WIDout_trade_no=" + this.order.orderNo + "&WIDtotal_amount=" + this.order.productTotal +
                        "&WIDsubject=测试" + "&WIDbody=连衣裙"
                }).then(result => {
                    return result.json()
                }).then(data => {
                    if (data["code"] === 200) {
                        //创建一个div对象,将后台传过来的HTML表单,追加到里面.
                        const div = document.createElement('div');
                        div.innerHTML = data["data"];
                        document.body.appendChild(div);
                        //自动提交表单
                        document.forms[0].submit();
                    } else {
                        alert(data["msg"]);
                    }
                })
            },
            getOrderByOrderNO: function (no) {
                fetch("/apis/order/getOrderByOrderNO/" + no, {
                    method: "get",
                }).then(result => {
                    return result.json()
                }).then(data => {
                    if (data["code"] === 200) {
                        this.order = data["data"];
                    } else {
                        alert(data["msg"]);
                    }
                })
            }
        },
        created() {
            this.order_no = this.$route.query.orderNo;
            this.getOrderByOrderNO(this.$route.query.orderNo);
        },
        components: {
            OrderTop,
            IndexFoot,
        }
    }
</script>

<style scoped>
    .body {
        width: 960px;
        margin: 0 auto;
    }

    .context {
        border-bottom: 5px #d4d4d4 solid;
    }

    .options {
        width: 100%;
        margin: 30px auto;

    }

    .options_top {
        width: 100%;
        height: 43px;
        overflow: hidden;
        border-bottom: 1px solid #cbcaca;
    }

    .options_top > div {
        width: 72px;
        height: 41px;
        float: left;
        padding: 10px 20px;
        border: 1px solid #cbcaca;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        text-align: center;
        font-size: 13px;
    }

    .bankCart_option {
        cursor: pointer;
    }

    .weChat_option {
        margin-left: 15px;
        cursor: pointer;
    }

    .method_bank {
        margin-left: 30px;
    }

    .bankCartNumber {
        margin: 30px 0;
        overflow: hidden;
    }

    .bankCartNumber > input {
        width: 360px;
        height: 30px;
        border-radius: 3px;
        border: 1px solid #b2b2b2;
        float: left;
    }

    .bankCartNumber > a {
        display: inline-block;
        width: 80px;
        height: 30px;
        line-height: 30px;
        color: #9b9b9b;
        background-color: #d0d0d0;
        border: 1px solid #d0d0d0;
        border-radius: 3px;
        float: left;
        margin-left: -3px;
        text-align: center;
        font-size: 14px;
    }

    .bankList {
        width: 100%;
    }

    .bankList > ul {
        overflow: hidden;
    }

    .bankList > ul > li {
        width: 175px;
        height: 50px;
        line-height: 50px;
        border: 1px solid #d2d1d1;
        margin-right: 25px;
        margin-bottom: 30px;
        text-align: center;
        font-size: 15px;
    }

    .cartSelect_hidden {
        width: 175px;
        height: 40px;
        /*visibility: hidden;*/
        position: absolute;
    }

    .bankList > ul > li:hover .cartSelect_hidden {
        visibility: visible;
    }

    .bankList > ul > li:nth-child(4n) {
        margin-right: 0;
    }

    .pay_warp {
        border-top: 1px solid #d2d1d1;
        padding-top: 25px;
    }

    .pay_submit {
        width: 144px;
        height: 46px;
        line-height: 46px;
        color: #9b9b9b;
        background-color: #d0d0d0;
        border: 1px solid #d0d0d0;
        border-radius: 3px;
        text-align: center;
        font-size: 15px;
    }

    .method_weChat {
        margin: 30px;
        width: 175px;
        height: 40px;
        background: url("../../assets/order/sprites-payment-logo.png") 0 -1880px no-repeat;
        background-color: #fff;
        border: 1px solid gray;
        cursor: pointer;
        box-sizing: border-box;
    }

    .method_weChat:hover {
        border: 2px solid green;
    }
</style>
