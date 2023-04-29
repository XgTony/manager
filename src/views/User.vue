<script setup>
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'
import {} from 'vue-router'
const form = ref(null)
const { proxy } = getCurrentInstance()
const user = reactive({
	userId: '',
	userName: '',
	state: 1,
})
const tableData = reactive([])
const pager = reactive({
	pageNum: 1,
	pageSize: 10,
})
const columns = reactive([
	{
		label: '用户ID',
		prop: 'userId',
	},
	{
		label: '用户名称',
		prop: 'userName',
	},
	{
		label: '用户邮箱',
		prop: 'userEmail',
	},
	{
		label: '用户角色',
		prop: 'role',
	},
	{
		label: '用户状态',
		prop: 'state',
	},
	{
		label: '注册时间',
		prop: 'createTime',
	},
	{
		label: '最后登录时间',
		prop: 'lastLoginTime',
	},
])
onMounted(() => {
	getTableData()
})
const getTableData = async () => {
	let params = { ...user, ...pager }
	try {
		let { list, page } = await proxy.$api.getUserList(params)
		tableData.length = 0
		list.forEach((element) => {
			tableData.push(element)
		})
		pager['total'] = page.total
	} catch (error) {
		console.log(error)
	}
}
const handleQuery = () => {
	getTableData()
}
// 重置表单
const handleReset = () => {
	form.value.resetFields()
}
// 改变分页器页数触发事件
const handleCurrentChange = (val) => {
	console.log(val);
	pager.pageNum = val
	console.log(pager);
}
</script>

<template>
	<div class="user-manager">
		<div class="query-form">
			<el-form :inline="true" :model="user" ref="form">
				<el-form-item label="用户id" prop="userId">
					<el-input
						v-model="user.userId"
						placeholder="请输入用户ID"
					></el-input>
				</el-form-item>
				<el-form-item label="用户名称" prop="userName">
					<el-input
						v-model="user.userName"
						placeholder="请输入用户名称"
					></el-input>
				</el-form-item>
				<el-form-item label="用户状态" prop="state">
					<el-select v-model="user.state">
						<el-option :value="0" label="所有"></el-option>
						<el-option :value="1" label="在职"></el-option>
						<el-option :value="2" label="离职"></el-option>
						<el-option :value="3" label="试用期"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleQuery"
						>查询</el-button
					>
					<el-button @click="handleReset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="base-table">
			<div class="action">
				<el-button type="primary">新增</el-button>
				<el-button type="danger">批量删除</el-button>
			</div>

			<el-table :data="tableData" style="width: 100%">
				<el-table-column type="selection" width="50" />
				<el-table-column
					v-for="item in columns"
					:key="item.prop"
					:prop="item.prop"
					:label="item.label"
				></el-table-column>
				<el-table-column label="操作" width="150">
					<template #default="scope">
						<el-button size="small" type="primary">编辑</el-button>
						<el-button type="danger" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				class="pagination"
				background
				layout="prev, pager, next"
				:total="pager.total"
				@current-change="handleCurrentChange"
			/>
		</div>
	</div>
</template>

<style></style>
