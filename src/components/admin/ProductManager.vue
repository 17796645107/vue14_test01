<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddProduct" class="btn-add">新增商品</el-button>

    <el-table :data="pageProductList.list" border>
      <el-table-column prop="id" label="ID" width="40px"/>
      <el-table-column prop="productNo" label="编号" width="120px"/>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="'../../static/product/'+scope.row.defaultImage.image"
            fit="cover"/>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="名称"/>
      <el-table-column prop="detail" label="描述"/>
      <el-table-column prop="price" label="价格"/>
      <el-table-column prop="collect" label="收藏量"/>
      <el-table-column label="热门">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isHot === 1" type="success" icon="el-icon-check" size="mini" circle></el-button>
          <el-button v-if="scope.row.isHot === 0" type="warning" icon="el-icon-close" size="mini" circle></el-button>
        </template>
      </el-table-column>
      <el-table-column label="新品">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isNew === 1" type="success" icon="el-icon-check" size="mini" circle></el-button>
          <el-button v-if="scope.row.isNew === 0" type="warning" icon="el-icon-close" size="mini" circle></el-button>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="created" label="上架时间" width="180px"/>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[5, 10, 20]"
      :page-size=pageSize
      layout="total, sizes, prev, pager, next, jumper"
      :total=pageProductList.size>
    </el-pagination>

    <el-dialog title="新增商品" :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" label-width="350px" label-position="top" size="small ">
        <el-form-item label="商品名称">
          <el-input class="p_name" v-model="form.pName"></el-input>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="form.pDesc"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <!--<el-cascader
            v-model="form.pCategory"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            :show-all-levels="false"/>-->
          <el-select v-model="form.pCategory" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.pPrice"></el-input>
        </el-form-item>
        <el-form-item label="商品颜色">
          <el-tag :key="tag" v-for="tag in productColors" closable :disable-transitions="false"
                  @close="handleCloseProductColorTag(tag)" >
            {{tag}}
          </el-tag>
          <el-input class="input-new-tag" v-if="colorInputVisible" v-model="colorInputValue"
                    ref="saveTagInput" size="small"
                    @keyup.enter.native="handleColorInputConfirm"
                    @blur="handleColorInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="colorShowInput">添加颜色</el-button>
        </el-form-item>
        <el-form-item label="商品尺寸">
          <el-tag :key="tag" v-for="tag in productSizes" closable :disable-transitions="false"
                  @close="handleCloseProductSizeTag(tag)">
            {{tag}}
          </el-tag>
          <el-input class="input-new-tag" v-if="sizeInputVisible" v-model="sizeInputValue"
                    ref="saveTagInput" size="small"
                    @keyup.enter.native="handleSizeInputConfirm"
                    @blur="handleSizeInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="sizeShowInput">添加尺寸</el-button>
        </el-form-item>
        <el-form-item label="商品图片">
          <!--<input type="file" @change="beforeUpload($event)" class="ImageFile"></input>
          <img :src="src" alt="" class="showImage" v-if="src !== ''">-->
          <el-upload action="#"
            list-type="picture-card"
            :auto-upload="false"
                     :on-change="imageChange">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="handleCancelProduct">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "ProductManager",
        data() {
            return {
                pageProductList: '',
                options: [
                    {
                        value: '40',
                        label: 'T恤',
                    },
                    {
                        value: '41',
                        label: '衬衫',
                    },
                    {
                        value: '42',
                        label: '连衣裙',
                    },
                    {
                        value: '43',
                        label: '外套',
                    },
                ],
                value: true,
                dialogVisible: false,
                form: {
                    pName: '',
                    pDesc: '',
                    pCategory: [],
                    pPrice: '',
                },
                pageSize: 5,
                formData: new FormData(),
                file: '',
                src:'',
                productColors: [],
                colorInputVisible: false,
                colorInputValue: '',
                productSizes: [],
                sizeInputVisible: false,
                sizeInputValue: '',
                imageList: [],

            }
        },
        methods: {
            imageChange(file) {
                //即不借助数组,直接将每一个文件放进去,append的时候的key都为fileList,最终在后端使用@requestParam(“fileList”) MultipartFile[] fileList 接收
                this.formData.append("files",file.raw);
                console.log(JSON.parse(sessionStorage.getItem("seller")));
            },

            handleCloseProductColorTag(tag) {
                this.productColors.splice(this.productColors.indexOf(tag), 1);
            },

            colorShowInput() {
                this.colorInputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleColorInputConfirm() {
                let inputValue = this.colorInputValue;
                if (inputValue) {
                    this.productColors.push(inputValue);
                }
                this.colorInputVisible = false;
                this.colorInputValue = '';
            },
            handleCloseProductSizeTag(tag) {
                this.productSizes.splice(this.productSizes.indexOf(tag), 1);
            },

            sizeShowInput() {
                this.sizeInputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleSizeInputConfirm() {
                let inputValue = this.sizeInputValue;
                if (inputValue) {
                    this.productSizes.push(inputValue);
                }
                this.sizeInputVisible = false;
                this.sizeInputValue = '';
            },
            handleEdit(){},

            /**
             * 删除商品
             * @param index
             * @param row
             */
            handleDelete(index,row){
                console.log(row.id);
                fetch("/apis/seller/updateProduct/"+ row.id,{
                    method:"get"
                }).then(result => result.json())
                .then(data =>{
                    if(data["code"] === 200){
                        let sellerId = JSON.parse(sessionStorage.getItem("seller")).id;
                        this.handlePageListProduct(sellerId);
                    }else{
                        alert(data["msg"]);
                    }
                })
            },
            handleSizeChange(){},
            handleCurrentChange(){},

            beforeUpload(event) {
                //获取图片文件
                this.file = event.target.files[0];
                //图片预览
                this.src =  window.URL.createObjectURL(this.file) ;
            },
            uploadFile(params){
                const file = params.file;
                this.formData.append("file",file);
            },
            handleCancelProduct() {
                this.dialogVisible = false
            },
            handleAddProduct() {
                this.dialogVisible = true
            },

            /**
             *
             * @param sellerId
             */
            handlePageListProduct(sellerId) {
                fetch("/apis/seller/pageList/" + sellerId + "/1/" + this.pageSize, {
                    method: "get"
                }).then(result => result.json())
                    .then(data => {
                        if (data["code"] === 200) {
                            this.pageProductList = data["data"];
                        } else {
                            this.$message({message: data["msg"] + data["msg"], type: "error"});
                        }
                    }).catch(reason => {
                    console.log(reason);
                })
            },

            handleListCategoryTree() {
                fetch("/apis/product/categoryTree", {
                    method: "get"
                }).then(result => result.json())
                    .then(data => {
                        if (data["code"] === 200) {
                            this.options = data["data"];
                        } else {
                            this.$message({message: data["msg"] + data["msg"], type: "error"});
                        }
                    })
            },
            /**
             * 新增商品提交
             */
            onSubmit() {
                let seller = JSON.parse(sessionStorage.getItem("seller"));
                let sellerId = seller.id;
                let brandId = seller.brand.id;
                //添加参数
                this.formData.set("title", this.form.pName);
                this.formData.set("detail", this.form.pDesc);
                this.formData.set("categoryId", this.form.pCategory);
                this.formData.set("price", this.form.pPrice);
                this.formData.set('colors', this.productColors);
                this.formData.set('sizes', this.productSizes);
                this.formData.set('sellerId', sellerId);
                this.formData.set('brandId', brandId);
                fetch("/apis/seller/addProduct", {
                    method: "post",
                    body: this.formData,
                }).then(result => result.json()
                ).then(data => {
                    if (data["code"] === 200) {
                        this.dialogVisible = false;
                        this.$message({type:"success",message:"商品添加成功！"});
                    } else {
                        this.$message({type:"error",message:data["msg"]});
                    }
                })
            }
        },
        created() {
            this.handlePageListProduct(this.$route.query.sellerId);

        }
    }
</script>

<style scoped>
  .el-input {
    width: 300px;
  }
  .ImageFile{
    display: block;
  }
  .showImage{
    width: 100px;
    height: 100px;
    margin-top: 10px;
    border: 1px black solid;

  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .el-pagination{
    margin-top: 20px;
  }
  .btn-add{
    margin-bottom: 10px;
  }
</style>
