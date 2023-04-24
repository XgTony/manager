<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.matched)
const breadList = computed(() => {
	return route.matched
})
</script>

<template>
	<el-breadcrumb separator="/">
		<el-breadcrumb-item
			:to="{ path: '/' }"
			v-for="(item, index) in breadList"
			:key="index"
		>
            <router-link to="/welcome" v-if="index === 0">{{ item.meta.title }}</router-link>
			<span v-else>{{ item.meta.title }}</span>
		</el-breadcrumb-item>
	</el-breadcrumb>

	<!-- <el-breadcrumb separator="/">
		<el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
		<el-breadcrumb-item
			><a href="/">promotion management</a></el-breadcrumb-item
		>
		<el-breadcrumb-item>promotion list</el-breadcrumb-item>
		<el-breadcrumb-item>promotion detail</el-breadcrumb-item>
	</el-breadcrumb> -->
</template>

<style scoped lang="scss"></style>
