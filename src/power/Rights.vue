<template>
	<div>
		<!-- 面包屑导航区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>权限管理</el-breadcrumb-item>
			<el-breadcrumb-item>权限列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片视图区域 -->
		<el-card class="box-card">
			<el-table :data="powerList" border stripe>
				<el-table-column type="index"></el-table-column>
				<el-table-column label="权限名称" prop="authName"></el-table-column>
				<el-table-column label="路径" prop="path"></el-table-column>
				<el-table-column label="权限等级" prop="level">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.level === '0'">一级</el-tag>
						<el-tag v-if="scope.row.level === '1'" type="success">二级</el-tag>
						<el-tag v-if="scope.row.level === '2'" type="warning">三级</el-tag>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
	export default {
		created() {
			this.getpower()
		},
		data() {
			return {
				powerList: []
			}
		},
		methods: {
			async getpower() {
				await this.$axios.get('/power').then(res => {
					if (res.data.code != 200) {
						this.$message.error('获取用户数据失败！')
					} else {
						this.powerList = res.data.usermsg
					}
				})
			}
		}
	}
</script>

<style scoped>
	.box-card {
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
	}

	.el-table {
		margin-top: 15px;
	}
</style>
