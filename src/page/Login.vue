<template>
	<div style="display: flex;">
		<div class="background">
			<img :src="imgSrc" width="100%" height="100%" alt="" />
		</div>
		<div>
			<el-card class="card">
				<!-- <div class="front"> -->
				<div style="text-align: center; margin-bottom: 50px;color: blue;font-size: 20px;">
					<span>请登陆账号</span>
				</div>
				<el-form :model="loginFrom" :rules="loginFromRules" ref="loginFromRef">
					<el-form-item prop="tel" style="display: flex;width: 100%;height: 40px;margin-top: 30px;">
						<!-- <span style="width: 80px;line-height: 40px;">账号：</span> -->
						<el-input v-model="loginFrom.tel" placeholder="请输入账号" prefix-icon="iconfont iconzhanghao" style="padding-right: 50px;margin-left: 30px;"></el-input>
					</el-form-item>
					<el-form-item prop="password" style="display: flex;width: 100%;height: 40px;margin-top: 30px;">
						<!-- <span style="width: 80px;line-height: 40px;">密码：</span> -->
						<el-input placeholder="请输入密码" v-model="loginFrom.password" show-password prefix-icon="iconfont iconmima" style="margin-left: 30px;margin-right: 35px;"></el-input>
					</el-form-item>
				</el-form>
				<div style="display: flex;justify-content: center;">
					<el-button type="primary" round style="width: 120px;margin: 20px 10px;" @click="login">登录</el-button>
					<el-button type="info" round style="width: 120px;margin: 20px 0;" @click="resetLoginFrom">重置</el-button>
				</div>
				<div style="text-align: center;color: blue; margin-top: 30px;font-size: 10px;">
					<span style="margin-right: 50px;">忘记密码</span>
					<span @click="register">去注册></span>
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
				loginFrom: {
					tel: "17765676681",
					password: "123456"
				},
				msg:'',
				imgSrc: require('../assets/login.jpg'),
				loginFromRules: {
					tel: [{
							required: true,
							message: '请输入登录名称',
							trigger: 'blur'
						},
						{
							min: 11,
							max: 11,
							message: '长度在 11 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入登录密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 18,
							message: '长度在 6 到 18 个字符',
							trigger: 'blur'
						}
					]
				}
			}
		},
		methods: {
			//点击重置按钮，重置登录表单
			resetLoginFrom() {
				// console.log(this)
				this.$refs.loginFromRef.resetFields();
			},
			//点击登陆按钮
			login() {
				var _this = this
				// console.log(this.loginFrom.username)
				this.$axios.post('/selectUser', {
					tel: this.loginFrom.tel,
					password: this.loginFrom.password,
				}).then(res => {
					if (res.data.code = 200) {
					    // var data = this.loginFrom
						window.sessionStorage.setItem("token", res.data.token)
					    var path = this.$route.query.redirect
					    this.$router.replace({path: path === '/index' || path === undefined ? '/home' : path})
						this.$notify({
						          title: '登录成功',
						          type: 'success',
								  duration:1500
						        });
					}else if(res.data.code = 400){
						console.log(err)
					}
					this.msg = res.data.msg
				}).catch(err => {
					console.log(err)
				})
			},
			register(){
				this.$router.replace('/register')
			}
		}
	}
</script>

<style>
	/* .row-bg {
    margin-left: 90px;
  } */
	.background {
		width: 100%;
		height: 100%;
		/**宽高100%是为了图片铺满屏幕 */
		z-index: -1;
		position: absolute;
	}

	.card {
		width: 380px;
		margin-top: 25%;
		margin-left: calc(calc(100vw - 400px) / 2);
		/* 动态居中 */
		background-color: rgba(200, 200, 200, 0.5);
		/* 背景虚化 */
		border-color: rgba(200, 200, 200, 0.5);
		border-radius: 10px;
	}
</style>
