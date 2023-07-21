<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
	userMenu: {
		type: Array,
		default() {
			return []
		},
	},
})
</script>

<template>
	<template v-for="(menu, index) in userMenu">
		<el-sub-menu
			v-if="
				menu.children &&
				menu.children.length > 0 &&
				menu.children[0].menuType == 1
			"
			:key="menu._id"
			:index="menu.path"
		>
			<template #title>
				<el-icon><Setting /></el-icon>
				<span>{{ menu.menuName }}</span>
			</template>
			<!-- <el-menu-item index="1-1">用户管理</el-menu-item>
			    <el-menu-item index="1-2">菜单管理</el-menu-item> -->
			<treeMenu :userMenu="menu.children"></treeMenu>
		</el-sub-menu>
		<el-menu-item
			v-else-if="menu.menuType == 1"
			:index="menu.path"
			:key="index"
			>{{ menu.menuName }}</el-menu-item
		>
	</template>

	<!-- <el-menu
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
	</el-menu> -->
</template>

<style></style>
