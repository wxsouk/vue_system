<template>
	<div>
		<!-- 面包屑导航区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片视图区域 -->
		<el-card class="box-card">
			<!-- 输入框与添加区域 -->
			<el-row :gutter="20">
				<el-col :span="8">
					<el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
				</el-col>
			</el-row>
			<el-table :data="userList" border stripe>
				<el-table-column type="index"></el-table-column>
				<el-table-column label="姓名" prop="name"></el-table-column>
				<el-table-column label="电话" prop="tel"></el-table-column>
				<el-table-column label="角色" prop="role_name"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" @click="showEdit(scope.row.id)"></el-button>
						<el-button type="danger" icon="el-icon-delete" @click="deluser(scope.row.id)"></el-button>
						<el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
							<el-button type="warning" icon="el-icon-setting"></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		
		<!-- 添加用户的提示框 -->
		<el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" @close="dialogClose">
			<el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
				<el-form-item label="用户名" prop="name">
					<el-input v-model="addForm.name"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="addForm.password"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="tel">
					<el-input v-model="addForm.tel"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="adduser">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 修改用户的提示框 -->
		<el-dialog title="修改用户" :visible.sync="editdialogVisible" width="50%" @close="dialogClose">
			<el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
				<el-form-item label="用户名" prop="name">
					<el-input v-model="editForm.name" disabled></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="editForm.password"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="tel">
					<el-input v-model="editForm.tel"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editdialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="edituser">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			//验证手机号的规则
			var checkTel = (rule, value, cb) => {
				const regTel = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

				if (regTel.test(value)) {
					return cb()
				}

				cb(new Error('请输入合法的手机号'))
			}
			return {
				// 获取用户列表的参数对象
				// queryInfo: {
				// 	query: '',
				// 	pagenum: 1,
				// 	pagesize: 2
				// }
				userList: [],
				input3: '',
				dialogVisible: false,
				editdialogVisible: false,
				addForm: {
					name: '',
					password: '',
					tel: ''
				},
				editForm: {
					name: '',
					password: '',
					tel: '',
					id: '',
					userid: '',
					role_name: ''
				},
				addFormRules: {
					name: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 10,
							message: '长度在 3~10 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入用户密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 18,
							message: '长度在 6~18 个字符',
							trigger: 'blur'
						}
					],
					tel: [{
							required: true,
							message: '请输入手机号码',
							trigger: 'blur'
						},
						{
							validator: checkTel,
							trigger: 'blur'
						}
					]
				},
				editFormRules: {
					password: [{
							required: true,
							message: '请输入用户密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 18,
							message: '长度在 6~18 个字符',
							trigger: 'blur'
						}
					],
					tel: [{
							required: true,
							message: '请输入手机号码',
							trigger: 'blur'
						},
						{
							validator: checkTel,
							trigger: 'blur'
						}
					]
				}
			}
		},
		created() {
			this.getUserList()
		},
		methods: {
			async getUserList() {
				await this.$axios.get('/users').then(res => {
					if (res.data.code != 200) {
						this.$message.error('获取用户数据失败！')
					} else {
						this.userList = res.data.usermsg
						console.log(res.data.usermsg)
					}
				})
			},
			//监听添加用户对话框的关闭事件
			dialogClose() {
				this.$refs.addFormRef.resetFields()
			},
			//点击按钮，添加新用户
			adduser() {
				this.$refs.addFormRef.validate(async valid => {
					if (!valid) return
					//可以发起添加用户的网络请求
					await this.$axios.post('/adduser', this.addForm).then(res => {
						if (res.data.code != 200) {
							this.$message.error('添加用户失败！')
						} else {
							this.$message.success('添加用户成功！')
							this.dialogVisible = false
							this.getUserList()
						}
					})
				})
			},
			//通过用户ID获取用户信息
			async showEdit(id) {
				this.editdialogVisible = true
				await this.$axios.post('/gainUser', {
					id
				}).then(res => {
					if (res.data.code != 200) {
						// this.$message.error('用户ID错误！')
					} else {
						// this.$message.success('用户ID正确！')
						this.editForm = res.data.usermsg[0]
					}
				})
			},
			//点击按钮，修改用户信息
			edituser() {
				this.$refs.editFormRef.validate(async valid => {
					if (!valid) return
					//可以发起修改用户的网络请求
					await this.$axios.post('/editUser', this.editForm).then(res => {
						if (res.data.code != 200) {
							this.$message.error('修改用户信息失败！')
						} else {
							this.$message.success('修改用户信息成功！')
							this.editdialogVisible = false
							this.getUserList()
						}
					})
				})
			},
			//点击按钮，删除用户信息
			deluser(id){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				  this.$axios.post('/delUser', {
				  	id
				  }).then(res => {
				  	if (res.data.code != 200) {
				  		this.$message.error('删除失败！')
				  	} else {
				  		this.$message.success('删除成功！')
				  		this.getUserList()
				  	}
				  })
				}).catch(() => {
				  this.$message({
				    type: 'info',
				    message: '已取消删除'
				  });          
				});
			}
		}
	}
</script>

<style scoped>
	.el-breadcrumb {
		margin-bottom: 15px;
		font-size: 12px;
	}

	.box-card {
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
	}

	.el-table {
		margin-top: 15px;
	}

	/* .el-table-column{
		text-align: center;
		display: flex;
		align-items: center;
	} */
</style>
