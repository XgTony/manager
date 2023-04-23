<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const { proxy } = getCurrentInstance()
const isCollapse = ref(false)
const userInfo = reactive({ userName: 'jack', userEmail: 'jack@gmail.com' })
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
				default-active="2"
				class="nav-menu"
				router
				background-color="#001529"
				text-color="#FFF"
				:collapse="isCollapse"
			>
				<el-sub-menu index="1">
					<template #title>
						<el-icon><location /></el-icon>
						<span>系统管理</span>
					</template>
					<el-menu-item index="1-1">用户管理</el-menu-item>
					<el-menu-item index="1-2">菜单管理</el-menu-item>
				</el-sub-menu>
				<el-sub-menu index="2">
					<template #title>
						<el-icon><icon-menu /></el-icon>
						<span>审批管理</span>
					</template>
					<el-menu-item index="2-1">休假申请</el-menu-item>
					<el-menu-item index="2-2">待我审批</el-menu-item>
				</el-sub-menu>
			</el-menu>
		</div>

		<div :class="['content-right', isCollapse ? 'fold' : 'unflod']">
			<div class="nav-top">
				<div class="nav-left">
					<el-icon class="menu-flod" @click="toggle"
						><Fold
					/></el-icon>
					<div class="bread">面包屑</div>
				</div>
				<div class="user-info">
					<el-badge :is-dot="true" class="notice" type="danger">
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
				<div class="main-page"><router-view></router-view></div>
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
		transition: width 0.8s;
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
        transition: width 0.8s;
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
