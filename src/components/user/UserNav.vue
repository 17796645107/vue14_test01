<template>
    <!-- 左侧导航 -->
    <nav>
        <div class="nav_left">
            <!--树形菜单-->
            <el-tree :data="navTree" :props="defaultProps" :default-expand-all="true"
                     @node-click="handleNodeClick"></el-tree>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "UserNav",
        data() {
            return {
                navTree: [
                    {
                        label: '我的交易',
                        children: [
                            {
                                label: '订单管理',
                            },
                            {
                                label: '退换/售后',
                            },
                            {
                                label: '收货地址',
                            },
                        ]
                    },
                    {
                        label: '我的资产',
                        children: [
                            {
                                label: '零钱',
                            },
                            {
                                label: '唯品金融',
                            },
                            {
                                label: '银行卡',
                            },
                            {
                                label: '联名卡',
                            },
                            {
                                label: '唯品卡',
                            },
                            {
                                label: '优惠券',
                            },
                            {
                                label: '唯品币',
                            }
                        ]
                    },
                    {
                        label: '我的账户',
                        children: [
                            {
                                label: '我的资料',
                            },
                            {
                                label: '分享账户',
                            },
                            {
                                label: '爱心账户',
                            },
                            {
                                label: '消息订阅',
                            },
                        ]
                    }
                ],

                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        methods: {
            handleNodeClick: function (data, node) {
                switch (data.label) {
                    case '订单管理':
                        this.$router.push("/order/orderControl");
                        break;
                    case '收货地址':
                        this.$router.push("/user/address");
                        break;
                    case '我的资料':
                        this.$router.push("/user/info");
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    /*左侧导航*/
    .nav_left {
        width: 127px;
        background: white;
        border: 1px solid rgb(228, 228, 228);
        float: left;
        padding: 10px 0 20px 0;
    }

    /*.my_deal{
      width: 107px;
      height: 103px;
      margin: 20px auto;
      border-bottom: 1px dotted #ddd;
    }
    .my_asset{
      width: 107px;
      height: 210px;
      margin: 20px auto ;
      border-bottom: 1px dotted #ddd;
    }
    .my_account{
      width: 107px;
      height: 129px;
      margin: 20px auto;
      border-bottom: 1px dotted #ddd;
    }
    dl>dt>a{
      font-weight: 900;
      color: black;
    }
    dl>dt>i{
      width: 13px;
      height: 13px;
      display: inline-block;
      background: url(../../assets/user/sprites.png)-71px -209px;
      cursor: pointer;
    }
    dl>dd{
      margin-left: 22px;
      height: 27px;
      line-height: 27px;
    }
    dl>dd>a{
      color: #666;
      font-size: 12px;
    }*/
</style>
