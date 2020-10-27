<template>
	<el-container class="index">
		<!-- 头部区域 -->
		<el-header class="el-header">
			<div class="logo">
				<img src="../assets/logo.png" alt="" />
				<span>电商后台管理系统</span>
			</div>
			<div class="header">
				<span style="margin-right: 20px;cursor: pointer;">修改密码</span>
				<span style="margin-right: 20px;cursor: pointer;">主题</span>
				<el-button type="primary" round @click="logout">退出</el-button>
				</li>
				</ul>
			</div>
		</el-header>
		<!-- 页面主体区域 -->
		<el-container>
			<!-- 侧边栏 -->
			<el-aside :width="isCollapse ? '64px':'230px'">
				<!-- 侧边栏菜单区域 -->
				<div class="toggle" @click="toggleCollapse">|||</div>
				<el-menu 
				background-color="#333744" 
				text-color="#fff"
				 active-text-color="#ffd04b"
				 unique-opened
				 :collapse="isCollapse" 
				 :collapse-transition="false"
				 :default-active="activePath"
				 router>
					<!-- 一级菜单 -->
					<el-submenu :index="tab.id + ''" 
					v-for="tab in tab" :key="tab.id" 
					style="width: 100%;margin-bottom: 15px;"
					>
						<!-- 一级菜单的模板区域 -->
						<template slot="title">
							<i :class="iconsObj[tab.id]"></i>
							<span style="width: 100%;padding-right: 100px;">{{tab.authName}}</span>
						</template>
						<!-- 二级菜单 -->
						<el-menu-item :index="'/' + obj.path" 
						v-for="obj in tab.children"
						:key="obj.id" 
						style="width: 100%;padding-right: 80px;margin-top: 10px;"
						@click="saveNavState('/' + obj.path)">
							<template slot="title">
								<i class="el-icon-menu"></i>
								<span>{{obj.authName}}</span>
							</template>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<!-- 右侧内容 -->
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		created() {
			this.getMenuList()
			this.activePath = window.sessionStorage.getItem('activePath')
		},
		data() {
			return {
				tab: [],
				iconsObj:{
					'101':'iconfont icon-shangpin',
					'102':'iconfont icon-user',
					'103':'iconfont icon-tijikongjian',
					'104':'iconfont icon-danju',
					'105':'iconfont icon-baobiao'
				},
				isCollapse:false,
				activeIndex: '0',
				//被激活的链接
				activePath:''
			}
		},
		methods: {
			handleSelect(index) {
				this.$data.activeIndex = index

				var path = this.$data.tab[index].path
				this.$router.push({
					path: path === '/home' || path === undefined ? '/home' : path
				})
				console.log(index)
			},
			logout() {
				window.sessionStorage.clear()
				this.$router.push('/login')
				this.$notify({
					title: '退出成功',
					type: 'success',
					duration: 1500
				});
			},
			async getMenuList() {
				await this.$axios.get('/menus').then(res => {
					this.$data.tab = res.data.usermsg
					var str = '';
					for (var i = 0; res.data.usermsg.length > i; i++) {
						str = res.data.usermsg[i].children
						res.data.usermsg[i].children = JSON.parse(str);
					}
				})
			},
			//点击按钮，切换菜单的折叠与展开
			toggleCollapse(){
				this.isCollapse = !this.isCollapse
			},
			//保存连接的激活状态
			saveNavState(activePath){
				window.sessionStorage.setItem('activePath',activePath)
				this.activeIndex = activePath
			}
		}
	}
</script>

<style scoped>
	.index {
		height: 100%;
		display: flex;
	}

	.el-header {
		background-color: #373d41;
		display: flex;
		justify-content: space-between;
		/* padding-left: 0; */
		color: #fff;
		font-size: 20px;
	}

	.el-menu {
		margin-top: 25px;
		border-right: none;
		/* margin-right: 60px; */
		/* width: 230px; */
	}

	.logo {
		display: flex;
		align-items: center;
	}

	.logo img {
		height: 80px;
		margin-right: 20px;
	}

	.header {
		align-items: center;
		display: flex;
	}

	.el-aside {
		background-color: #333744;
		color: #fff;
	}

	.el-main {
		background-color: #E9EEF3;
	}
	.toggle{
		background-color: #4a5064;
		font-size: 10px;
		line-height: 24px;
		color: #FFFFFF;
		text-align: center;
		letter-spacing: 0.2em;
		cursor: pointer;
	}
</style>
