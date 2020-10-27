import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index.vue'
import Login from '@/page/Login.vue'
import Register from '@/page/Register.vue'
import Home from '@/components/Home.vue'
import About from '@/page/About.vue'
import Users from '@/page/Users.vue'
import Rights from '@/power/Rights.vue'
import Roles from '@/power/Roles.vue'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [{
			path: '/index',
			name: 'Index',
			component: Index,
			redirect: '/home',
			children: [{
				path: '/home',
				component: Home,
				meta: {
					requireAuth: true
				}
			}, {
				path: '/about',
				component: About,
				meta: {
					requireAuth: true
				}
			},{
				path: '/users',
				component: Users,
				meta: {
					requireAuth: true
				}
			},{
				path: '/rights',
				component: Rights,
				meta: {
					requireAuth: true
				}
			},
			{
				path: '/roles',
				component: Roles,
				meta: {
					requireAuth: true
				}
			}
			]
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/register',
			name: 'Register',
			component: Register
		}
		// {
		// 	path:'/home',
		// 	name:'Home',
		// 	component:Home,
		// 	meta:{
		// 		requireAuth: true
		// 	}
		// }
	]
})

router.beforeEach((to, from, next) => {
	const tokenStr = window.sessionStorage.getItem('token')
	if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
		if (!tokenStr) { // 判断本地是否存在token
			// 未登录,跳转到登陆页面
			return next('/login')
		} else {
			next()
		}
	} else {
		if (tokenStr) {
			next('/index');
		} else {
			next();
		}
	}
})

export default router
