<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import treeMenu from '@/components/TreeMenu.vue'
import BreadCrumb from '@/components/BreadCrumb.vue';
const router = useRouter()
const { proxy } = getCurrentInstance()
let isCollapse = ref(false)
let noticeCount = ref(0)
const userMenu = reactive([])
const userInfo = reactive(proxy.$store.state.userInfo)
onMounted(() => {
	getNoticeCount()
	getMenuList()
})

const handleLogout = (key) => {
	if (key === 'email') return
	if (key === 'logout') {
		proxy.$store.commit('saveUserInfo', '')
		for (const key in userInfo) {
			delete userInfo[key]
		}
		router.push('/login')
	}
}
const getNoticeCount = async () => {
	try {
		let count = await proxy.$api.noticeCount()
		noticeCount.value = count
	} catch (error) {
		console.error(error)
	}
}
const getMenuList = async () => {
	try {
		let list = await proxy.$api.getMenuList()
		// console.log(list)
		list.forEach((element) => {
			userMenu.push(element)
		})
	} catch (error) {
		console.error(error)
	}
}

const toggle = () => {
	isCollapse.value = !isCollapse.value
}
</script>

<template>
	<div class="base-layout">
		<!-- 系统log -->
		<div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
			<div class="logo">
				<img src="./../assets/logo.png" alt="" />
				<span>Manager</span>
			</div>
			<!-- 导航菜单 -->
			<!-- @open="handleOpen" -->
			<!-- @close="handleClose" -->
			<el-menu
                default-active="/system/menu"
				class="nav-menu"
				router
				background-color="#001529"
				text-color="#FFF"
				:collapse="isCollapse"
			>
                <treeMenu :userMenu="userMenu"></treeMenu>
            </el-menu>
		</div>

		<div :class="['content-right', isCollapse ? 'fold' : 'unflod']">
			<div class="nav-top">
				<div class="nav-left">
					<el-icon class="menu-flod" @click="toggle"
						><Fold
					/></el-icon>
					<div class="bread">
                        <BreadCrumb></BreadCrumb>
                    </div>
				</div>
				<div class="user-info">
					<el-badge
						:is-dot="Boolean(noticeCount)"
						class="notice"
						type="danger"
					>
						<el-icon><BellFilled /></el-icon>
					</el-badge>
					<el-dropdown @command="handleLogout">
						<span class="user-link">
							{{ userInfo.userName }}
							<el-icon class="el-icon--right">
								<arrow-down />
							</el-icon>
						</span>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item command="email"
									>邮箱:{{
										userInfo.userEmail
									}}</el-dropdown-item
								>
								<el-dropdown-item command="logout"
									>退出</el-dropdown-item
								>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
			</div>
			<div class="wrapper">
				<!-- Welcome.vue的出口 -->
				<!-- <div class="main-page"></div> -->
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.base-layout {
	position: relative;

	.nav-side {
		position: fixed;
		width: 200px;
		height: 100vh;
		background-color: #001529;
		color: #fff;
		overflow-y: auto;
		overflow-x: hidden;
		transition: width 0.5s;
		&.fold {
			width: 64px;
		}
		&.unfold {
			width: 200px;
		}
		.logo {
			display: flex;
			align-items: center;
			font-size: 18px;
			height: 50px;
			line-height: 50px;
			img {
				width: 32px;
				height: 32px;
				margin: 0 16px;
			}
		}
	}
	.nav-menu {
		height: calc(100vh - 50px);
		border: 1px none;
	}

	.content-right {
		margin-left: 200px;
		transition: width 0.5s;
		&.fold {
			margin-left: 64px;
		}
		&.unfold {
			margin-left: 200px;
		}
		.nav-top {
			height: 50px;
			line-height: 50px;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #ddd;
			padding: 0 20px;
			.nav-left {
				display: flex;
				align-items: center;
				.menu-flod {
					margin-right: 15px;
					font-size: 18px;
				}
			}
			.user-info {
				.notice {
					line-height: 30px;
					margin-right: 15px;
				}
				.user-link {
					line-height: 50px;
					cursor: pointer;
					color: #409eff;
				}
				.el-tooltip__trigger:focus {
					outline: none;
				}
			}
		}
		.wrapper {
			background-color: #eef0f3;
			padding: 20px;
			height: calc(100vh - 50px);
			.main-page {
				background-color: #fff;
				height: 100%;
			}
		}
	}
}
</style>
