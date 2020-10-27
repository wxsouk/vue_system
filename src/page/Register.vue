<template>
  <div style="display: flex;">
    <div class="background">
        <img :src="imgSrc" width="100%" height="100%" alt="" />
    </div>
    <div>
      <el-card class="card">
        <!-- <div class="front"> -->
          <div style="text-align: center; margin-bottom: 50px;color: blue;font-size: 20px;">
            <span>欢迎你</span>
          </div>
          <el-row type="flex" justify="center">
            <el-col>
              <div style="display: flex;width: 350px;height: 40px;">
                <span style="width: 120px;line-height: 40px;">名称：</span>
                <el-input v-model="name" placeholder="请输入名称"></el-input>
              </div>
            </el-col>
          </el-row>
		  <el-row type="flex" justify="center">
		    <el-col>
		      <div style="display: flex;width: 350px;height: 40px;">
		        <span style="width: 120px;line-height: 40px;">账号：</span>
		        <el-input v-model="tel" placeholder="请输入账号"></el-input>
		      </div>
		    </el-col>
		  </el-row>
          <el-row type="flex" justify="center">
            <el-col>
              <div style="display: flex;width: 350px;height: 40px;margin-top: 30px;">
                <span style="width: 120px;line-height: 40px;">密码：</span>
                <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col>
              <div style="display: flex;width: 350px;height: 40px;margin-top: 30px;">
                <span style="width: 120px;line-height: 40px;">确认密码：</span>
                <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
              </div>
            </el-col>
          </el-row>
          <el-button type="primary" round style="width: 200px;margin: 20px 0;" @click="register">注册</el-button>
          <div style="text-align: center;color: blue; margin-top: 30px;font-size: 10px;">
            <span style="margin-right: 50px;" @click="login">返回登录</span>
            <!-- <span>去注册></span> -->
          </div>
        <!-- </div> -->
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
		tel:'',
        password: '',
        imgSrc:require('../assets/login.jpg'),
		msg:''
      }
    },
	methods:{
		login(){
			this.$router.replace('/login')
		},
		register(){
			this.$axios.post('/addUser', {
				name: this.name,
				password: this.password,
				tel:this.tel
			}).then(result => {
				console.log(result)
				// if (result.status === 200) {
				//     // var data = this.loginForm
				// 	// sessionStorage.setItem("token", 'false')
				//     var path = this.$route.query.redirect
				//     this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
				// }else if(result.status === 400){
				// 	console.log(err)
				// }
				this.msg = result.data.msg
			}).catch(err => {
				console.log(err)
			})
		}
	}
  }
</script>

<style>
  /* .row-bg {
    margin-left: 90px;
  } */
  .background{
      width:100%;
      height:100%;  /**宽高100%是为了图片铺满屏幕 */
      z-index:-1;
      position: absolute;
  }

  .card{
    width: 420px;
    margin-top: 25%;
    margin-left: calc(calc(100vw - 400px) / 2); /* 动态居中 */
    background-color: rgba(200,200,200,0.5); /* 背景虚化 */
    border-color: rgba(200,200,200,0.5);
    border-radius: 10px;
  }
</style>
