<template>
  <!--
    作者：邓宁宁
    时间：2018-09-24
    描述：
  -->
  <div class="UserAddress">
    <IndexHeadTop></IndexHeadTop>
    <IndexHeadSearch></IndexHeadSearch>
    <IndexHeadNav></IndexHeadNav>

    <div class="body">
      <div class="body_main">
        <UserNav></UserNav>
        <div class="address_warp">
          <div class="address_title">
            <p>
              <strong>已经保存的收货地址</strong>
              您已经创建 <span>{{addressList.length}}</span> 个收货地址，最多可创建 10 个
            </p>
            <a href="#add" class="btn_add">新增收货地址</a>
          </div>
          <div class="address_list">
            <div class="address_info" v-for="address in addressList">
              <a href="javascript:;" class="default_address" v-show="address.is_default === 1">默认地址</a>
              <a href="javascript:;" class="setDefaultAddress" v-show="address.is_default !== 1">设为默认地址</a>
              <p class="u_name">{{address.name}}</p>
              <p class="u_address">
                {{address.province}}&nbsp;
                {{address.city}}&nbsp;
                {{address.town}}&nbsp;
                {{address.area}}
              </p>
              <p class="u_telephone">
                {{address.telephone.substring(0,3)}}*****{{address.telephone.substring(8,11)}}
              </p>
              <div class="address_btn">
                <a href="javascript:;" v-show="address.is_default !== 1" @click="deleteAddress(address.address_id)">删除</a>
                <a href="#add" @click="updateAddress(address)">修改</a>
              </div>
            </div>

          </div>
          <div class="address_add">
            <a name="add"></a>
            <div class="address_add_title">
              <strong>新增收货地址</strong>
            </div>
            <form>
              <div class="consignee">
                <label>
                  <strong>*</strong>收货人:
                </label>
                <input type="text" placeholder="收货人姓名" v-model="name">
              </div>
              <div class="area">
                <label>
                  <strong>*</strong>地址:
                </label>
                <input type="text" placeholder="省/直辖市" v-model="province">
                <input type="text" placeholder="市" v-model="city">
                <input type="text" placeholder="区/县" v-model="town">
                <!--<input type="text" placeholder="乡镇/街道" v-model="area">-->
              </div>
              <div class="address">
                <label>

                </label>
                <input type="text" placeholder="详细地址" v-model="area">
              </div>
              <div class="phone">
                <label>
                  <strong>*</strong>手机:
                </label>
                <input type="text" placeholder="手机号" v-model="telephone">
              </div>
              <div class="address_add_submit">
                <input type="submit" value="保存收货地址" @click="saveAddress"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <IndexFoot></IndexFoot>
  </div>
</template>

<script>
  import IndexHeadTop from "../index/IndexHeadTop"
  import IndexHeadSearch from  "../index/IndexHeadSearch"
  import IndexHeadNav from "../index/IndexHeadNav"
  import IndexFoot from "../index/IndexFoot"
  import UserNav from "../user/UserNav"
    export default {
      name: "UserAddress",
      components: {
        IndexHeadTop,
        IndexHeadSearch,
        IndexHeadNav,
        IndexFoot,
        UserNav,
      },
      data(){
        return{
          addressList:"",
          name:"",
          province: "",
          city:"",
          town:"",
          area:"",
          telephone:"",
        }
      },
      methods:{
        getUserAddressList:function (id) {
          fetch("/apis/user/findAllUserAddress/"+id,{
            method:"get"
          }).then(result =>{
            return result.json()
          }).then(data =>{
            if (data["code"] === 200){
              this.addressList = data["data"];
            } else{
              alert(data["msg"]);
            }
          })
        },
        saveAddress:function () {
          fetch("/apis/user/saveUserAddress",{
            method:"post",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              "userId":this.$store.getters.getUser.id,
              "name":this.name,
              "province":this.province,
              "city":this.city,
              "town":this.town,
              "area":this.area,
              "telephone":this.telephone,
            })
          }).then(result =>{
            return result.json()
          }).then(data =>{
            if (data["code"] === 200){
              alert("添加收货地址成功!");
              this.name = "";
              this.province = "";
              this.city = "";
              this.town = "";
              this.area = "";
              this.telephone = "";
              this.getUserAddressList(this.$store.getters.getUser.id);
            } else{
              alert(data["msg"]);
            }
          })
        },
        deleteAddress:function (id) {
          fetch("/apis/user/deleteUserAddressByAddressID/"+this.$store.getters.getUser.id+"/"+id,{
            method:"get"
          }).then(result =>{
            return result.json()
          }).then(data =>{
            if (data["code"] === 200){
              alert("删除收货地址成功！");
              this.getUserAddressList(this.$store.getters.getUser.id);
            }else {
              alert(data["msg"]);
            }
          })
        },
        updateAddress:function (address) {

        }
      },
      created(){
        if (this.$store.getters.getUserState === "true") {
          this.getUserAddressList(this.$store.getters.getUser.id);
        }else {
          this.$router.push("/user/login");
        }
      }
    }
</script>

<style scoped>
  .body{
    width: 100%;
    background: url(../../assets/user/layout-bg.png)no-repeat center 0 rgb(245,246,248);
  }
  .body_main{
    width: 1000px;
    margin: 0 auto;
    padding-top: 30px;
    overflow: hidden;
  }
  .address_warp{
    background: white;
    width: 820px;
    margin-left: 20px;
    margin-bottom: 50px;
    float: left;
  }
  .address_title{
    /*width: 100%;*/
    padding: 0 25px;
    height: 56px;
    line-height: 56px;
    border-bottom: 1px solid #ebebeb;
  }
  .btn_add{
    width: 112px;
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    text-align: center;
    color: white;
    background-color: #f10180;
    border-radius: 3px;
    display: inline-block;
    float: right;
    margin-top: -44px;
    font-size: 12px;
  }
  .address_list{
    width: 100%;
    padding-top: 20px;
  }
  /*用户地址*/
  .address_info{
    width: 227px;
    height: 122px;
    display: inline-block;
    background: url(../../assets/user/address-bg.png) no-repeat;
    margin: 0 0 20px 10px;
    padding: 14px;
  }
  .address_info:hover .setDefaultAddress{
    visibility: visible;
  }
  .setDefaultAddress{
    top:-14px;
    background: #ee3495 none repeat;
    display: inline;
    border-radius: 0 0 5px 5px;
    color: #fff;
    padding: 0 10px;
    position:relative;
    cursor: pointer;
    float: right;
    visibility: hidden;
  }
  .default_address{
    top:-14px;
    background: #ee3495 none repeat;
    display: inline;
    border-radius: 0 0 5px 5px;
    color: #fff;
    padding: 0 10px;
    position:relative;
    cursor: pointer;
    float: right;
  }
  .u_name{
    font-size: 14px;
    background: url(../../assets/user/i-addr-user.png) no-repeat 1px 4px;
    padding: 0 0 3px 20px;
    border-bottom: 1px dotted #dcdcdc;
  }
  .u_address{
    padding: 6px 0 3px 20px;
    border-bottom: 1px dotted #dcdcdc;
    height: 54px;
    background: url(../../assets/user/i-addr-mark.png) no-repeat 1px 8px;
  }
  .u_telephone{
    background: url(../../assets/user/i-addr-phone.png) no-repeat 1px 8px;
    padding: 6px 0 3px 20px;
  }
  .address_add{
    width: 100%;
    background: rgb(251,251,251);
    border-top: 1px solid #ef50a3;
  }
  .address_btn{
    height: 24px;
    margin:-15px 10px 0 0;
    float: right;
  }
  .address_btn>a{
    display: inline-block;
    width: 32px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: #fafafa;
    border: 1px solid #c2c2c2;
    color: #333;
    border-radius: 3px;
    cursor: pointer;
  }
  .address_add_title{
    padding:0 20px;
    height: 50px;
    line-height: 50px;
    background:white ;
    font-size: 14px;
    border-bottom:1px solid rgb(220,220,220);
  }
  .address_add>form{
    padding: 20px 35px;
  }
  .consignee{
    width: 100%;
    height: 32px;
    line-height: 32px;
    margin-bottom: 15px;
  }
  .consignee>label{
    display: inline-block;
    width: 75px;
    margin-right: 10px;
    text-align: right;
  }
  .consignee>label>strong{
    color: #ef50a3;;
    margin-right: 5px;
  }
  .consignee>input{
    border: 1px solid #b2b2b2;
    border-radius: 3px;
    background:white;
    height: 18px;
    line-height: 18px;
    padding: 6px 10px;
  }
  .area{
    width: 100%;
    height: 32px;
    line-height: 32px;
    margin-bottom: 15px;
  }
  .area>label{
    display: inline-block;
    width: 75px;
    margin-right: 10px;
    text-align: right;
  }
  .area>label>strong{
    color: #ef50a3;;
    margin-right: 5px;
  }
  .area>input{
    width: 120px;
    border: 1px solid #b2b2b2;
    border-radius: 3px;
    background:white;
    height: 18px;
    line-height: 18px;
    padding: 6px 10px;
  }
  .phone{
    width: 100%;
    height: 32px;
    line-height: 32px;
    margin-bottom: 15px;
  }
  .phone>label{
    display: inline-block;
    width: 75px;
    margin-right: 10px;
    text-align: right;
  }
  .phone>label>strong{
    color: #ef50a3;;
    margin-right: 5px;
  }
  .phone>input{
    width: 300px;
    border: 1px solid #b2b2b2;
    border-radius: 3px;
    background:white;
    height: 18px;
    line-height: 18px;
    padding: 6px 10px;
  }
  .address{
    width: 100%;
    height: 32px;
    line-height: 32px;
    margin-bottom: 15px;
  }
  .address>label{
    display: inline-block;
    width: 75px;
    margin-right: 10px;
    text-align: right;
  }
  .address>label>strong{
    color: #ef50a3;;
    margin-right: 5px;
  }
  .address>input{
    width: 300px;
    border: 1px solid #b2b2b2;
    border-radius: 3px;
    background:white;
    height: 18px;
    line-height: 18px;
    padding: 6px 10px;
  }
  .address_add_submit{
    width: 100%;
    height: 32px;
    margin: 20px 0;
    border-top: rgb(225,225,225)1px solid;
    cursor: pointer;
  }
  .address_add_submit>input{
    width: 170px;
    height: 32px;
    background-color: #f10180;
    border-radius: 3px;
    border: 1px solid #f10180;
    color: white;
    text-align: center;
    margin: 20px 0 10px 285px;
  }

</style>
