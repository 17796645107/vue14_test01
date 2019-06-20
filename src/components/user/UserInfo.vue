<template>
  <div class="UserInfo">
    <IndexHeadTop></IndexHeadTop>
    <IndexHeadSearch></IndexHeadSearch>
    <IndexHeadNav></IndexHeadNav>

    <div class="body">
      <div class="info_warp">
        <UserNav></UserNav>

        <div class="message_warp">
          <div class="message_title">
            <h3>基本资料</h3>
          </div>
          <div class="message_headImage">
            <div class="head_image">
              <a href="javascript:;" >
                <img :src="'../../../static/user/headIcon/'+user.headImage" />
                <span class="updateButton" @click="showUpload">编辑头像</span>
              </a>
            </div>
            <div class="username">
              <p>
                <strong>
                  {{user.nickname}}
                  ({{user.telephone.substring(0,3)}}*****{{user.telephone.substring(8,11)}})
                </strong>
              </p>
              <p>
                资料完整度：<span><i>50%</i></span>
              </p>
            </div>
          </div>
          <form>
            <div class="message_context">
              <div class="user_name">
                <label>
                  <strong>*</strong>昵称：
                </label>
                <input type="text" name="name" v-model="user.nickname">
                <div class="name_error"></div>
              </div>
              <div class="user_sex">
                <label>
                  <strong>*</strong>性别：
                </label>
                <input type="radio" name="sex" value="男" v-model="user.sex">男
                <input type="radio" name="sex" value="女" v-model="user.sex">女
                <div class="sex_error"></div>
              </div>
              <div class="user_birthday">
                <label>
                  <strong>*</strong>生日：
                </label>
                <div v-show="user.birthday == null">
                  <select v-model="year">
                    <option value="">请选择</option>
                    <option value="1997">1997</option>
                  </select> 年
                  <select v-model="month">
                    <option value="1">1</option>
                  </select> 月
                  <select v-model="day">
                    <option value="12">12</option>
                  </select> 日
                </div>
                <span v-show="user.birthday != null">{{user.birthday}}</span>
                <!--<div class="sex_error"></div>-->
              </div>
              <div class="user_phone">
                <label>
                  移动电话：
                </label>
                <span>{{user.telephone}}</span>
                <span class="validate_phone">(已验证)</span>
                <a href="">修改</a>
              </div>
              <!--<div class="user_area">
                <label>
                  <strong>*</strong>所在地地址：
                </label>
                &lt;!&ndash;<select v-model="selected" autofocus v-if="provinceL">
                  <option disabled value="请选择城市">请选择城市</option>
                  <option v-for="(item,index) in provinceL" :value="item">{{item.name}}</option>
                </select>
                <select v-model="citySelected" v-if="cityL">
                  <option disabled value="请选择城市">请选择城市</option>
                  <option v-for="(item,index) in cityL" :value="item">{{item.name}}</option>
                </select>
                <select v-model="areaSelected" v-if="areaL">
                  <option disabled value="请选择城市">请选择区县</option>
                  <option v-for="(item,index) in areaL" :value="item">{{item.name}}</option>
                </select>
                <SelectCity></SelectCity>&ndash;&gt;

                <select v-model="province">
                  <option value="">请选择</option>
                  <option value="河南省">河南省</option>
                </select>
                <select v-model="city">
                  <option value="">请选择</option>
                  <option value="郑州市">郑州市</option>
                </select>
                <select v-model="town">
                  <option value="">请选择</option>
                  <option value="金水区">金水区</option>
                </select>
              </div>
              <div class="user_address">
                <label>
                  &nbsp;
                </label>
                <input type="text" v-model="area" placeholder="详细地址">
              </div>-->
              <div class="user_email">
                <label>
                  邮箱：
                </label>
                <input type="text" v-model="user.email" />
                <input type="button" value="验证邮箱" v-show="user.email == null">
              </div>
            </div>
            <div class="form_submit">
              <input value="提交" @click="updateUserInfo">
              <input type="reset" value="重置">
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="userIcon" v-show="showUploadFrame">
      <!--<el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>-->

      <a href="javascript:;" class="close" @click="closeUploadFrame">X</a>
      <h2>自定义头像</h2>
      <div class="upload">
        <input type="file" @change="getFile($event)">
        <span>支持大小不超过 5M 的 jpg、png 图片</span>
      </div>
      <button type="button"  @click="uploadIcon($event)">保存</button>
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
  // import SelectCity from "../util/SelectCityUtil"

    export default {
      name: "UserInfo",
      data(){
        return{
          user:"",
          /*province: "",
          city:"",
          town:"",
          area:"",*/
          year:"",
          month:"",
          day:"",
          showUploadFrame:false,
          file:""
        }
      },
      methods:{
        //获取上传图片
        getFile:function(event){
          this.file = event.target.files[0];
        },
        uploadIcon:function(event){
          event.preventDefault();
          let formData = new FormData();
          formData.append("file", this.file);
          formData.append("userId", this.user.user_id);
          fetch("/apis/user/uploadUserHeadImage",{
            method:"post",
            body:formData
          }).then(result =>result.json()
          ).then(data =>{
            if (data["code"] === 200){
              this.getUserDetail();
              alert("用户头像上传成功");
            } else{
              alert("用户头像上传失败");
            }
          })
        },
        showUpload:function(){
          this.showUploadFrame = true;
        },
        closeUploadFrame:function(){
          this.showUploadFrame = false;
        },
        updateUserInfo:function () {
          let checkBirthday = this.checkBirthday();
          if (!checkBirthday) {
            return false;
          }
          if (this.user.birthday == null){
            this.user.birthday = this.year + "-" + this.changeBirthday(this.month) + "-"+ this.changeBirthday(this.day);
          }
          fetch("/apis/user/updateUser",{
            method:"post",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              "id":this.user.id,
              "nickname":this.user.nickname,
              "sex":this.user.sex,
              "birthday":this.user.birthday,
              "email":this.user.email
            })
          }).then(result =>{
            return result.json()
          }).then(data =>{
            if (data["code"] === 200){
              alert("用户信息更新成功");
              this.getUserDetail(this.user.id);
            } else{
              alert(data["msg"]);
            }
          })
        },
        changeBirthday:function (number) {
          if (number < 10){
            return "0" + number;
          }
          return number;
        },
        checkBirthday:function () {
          if (this.user.birthday == null){
            if (this.year === "" || this.month === "" || this.day === ""){
              alert("请填写生日信息");
              return false;
            }
          }
          return true;
        },
        getUserDetail:function (userId) {
          fetch("/apis/user/getUserById/" + userId,{
            method:"get",
          }).then(result =>{
            return result.json()
          }).then(data =>{
            if (data["code"] === 200){
              this.user = data["data"];
              //更新用户信息
              sessionStorage.setItem("user",JSON.stringify(data["data"]));
            }else {
              alert(data["msg"]);
            }
          })
        }
      },
      created(){
        if (this.$store.getters.getUserState === "true") {
          this.user = this.$store.getters.getUser;
        }else{
          this.$router.push("/user/login");
        }
      },
      /*watch: {
        selected: function () {
          // 清除区县
          this.citySelected = {}
          this.cityL = city.filter((item) => item.parentId === this.selected.code)
        },
        citySelected: function () {
          this.areaL = area.filter((item) => item.parentId === this.citySelected.code)
        }
      },*/
      components: {
        IndexHeadTop,
        IndexHeadSearch,
        IndexHeadNav,
        IndexFoot,
        UserNav,
        // SelectCity,
      },
    }
</script>

<style scoped>
  .body{
    width: 100%;
    background: url(../../assets/user/layout-bg.png)no-repeat center 0 rgb(245,246,248);
  }
  .info_warp{
    width: 1000px;
    margin: 0 auto;
    padding-top: 30px;
    overflow: hidden;
  }
  .message_warp{
    background: white;
    width: 820px;
    margin-left: 20px;
    float: left;
    margin-bottom: 50px;
    padding-bottom: 20px;
  }
  .message_title{
    width: 100%;
    height: 47px;
    line-height: 47px;
    background: rgb(249,249,249);
    border: 1px solid rgb(236,236,236);
    box-sizing: border-box;
  }
  .message_title h3{
    margin-left: 40px;
  }
  .message_headImage{
    width: 758px;
    height: 170px;
    margin: 0 auto;
    border-bottom: 1px solid rgb(236,236,236);
  }
  .head_image{
    width: 92px;
    height: 92px;
    float: left;
    margin-top: 40px;
  }
  .head_image>a{
    display: block;
    width: 100%;
    height: 100%;
  }
  .head_image>a:hover .updateButton{
    visibility: visible;
  }
  .updateButton{
    float: left;
    margin-top: -20px;
    margin-left: 20px;
    visibility: hidden;
  }
  .head_image img{
    width: 100%;
    height: 100%;
    float: left;
  }
  .username{
    width: 200px;
    height: 50px;
    margin-top: 40px;
    margin-left: 20px;
    float: left;
  }
  .message_context{
    width: 758px;
    height: 320px;
    margin: 0 auto;
    border-bottom: 1px solid rgb(236,236,236);
  }
  .message_context>div{
    width: 100%;
    height: 32px;
    line-height: 32px;
    margin: 20px 0;
  }
  .message_context>div>label{
    width: 100px;
    height: 100%;
    display: inline-block;
    text-align: right;
    margin-right: 10px;
    font-size: 14px;
    color: #666;
  }
  .message_context>div>label>strong{
    color:#f10180;
    margin-right: 5px;
  }
  /*.message_context>div>div{
      display: inline;
      border: 0;
  }*/
  .message_context>div>input{
    padding: 6px 10px 8px;
    border-radius: 5px;
    border:1px solid #fca1a6;
    background-color: #ffeded;
  }
  .form_submit{
    width: 100%;
    height: 34px;
    padding-top: 20px;
  }
  .form_submit>input:nth-child(1){
    width: 100px;
    height: 34px;
    line-height: 34px;
    background: rgb(241,1,128);
    border-radius: 5px;
    border: 0;
    color: white;
    margin-left: 360px;
    text-align: center;
    cursor: pointer;
  }
  .form_submit>input:nth-child(2){
    border: 0;
    background: white;
  }
  .form_submit>input:nth-child(2):hover{
    color:#1d94d1;
  }
  .userIcon{
    width: 500px;
    height: 400px;
    padding: 35px;
    left: 368px;
    top: 170px;
    position: absolute;
    opacity: 1;
    z-index: 1000;
    background: #a0c5e8;
  }
  .userIcon>button{
    width: 80px;
    height: 30px;
    text-align: center;
  }
  .upload{
    margin:20px 0;
  }
  .upload>span{
    margin-top: 15px;
    display: block;
  }
  .close{
    float: right;
  }
/*用户上传头像组件*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
