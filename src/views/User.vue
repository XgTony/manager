<script setup>
import { reactive, ref } from 'vue'
import {} from 'vue-router'

const user = reactive({
	userId: '',
	userName: '',
	state: 1,
})
const tableData = reactive([])
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
</script>

<template>
	<div class="user-manager">
		<div class="query-form">
			<el-form :inline="true" :model="user">
				<el-form-item>
					<el-input
						v-model="user.userId"
						placeholder="请输入用户ID"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-input
						v-model="user.userName"
						placeholder="请输入用户名称"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-select v-model="user.state">
						<el-option :value="0" label="所有"></el-option>
						<el-option :value="1" label="在职"></el-option>
						<el-option :value="2" label="离职"></el-option>
						<el-option :value="3" label="试用期"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">查询</el-button>
					<el-button>重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="base-table">
			<div class="action"></div>

			<el-table :data="tableData" style="width: 100%">
				<el-table-column type="selection" width="50" />
				<el-table-column
					v-for="item in columns"
					:key="item.prop"
					:prop="item.prop"
                    :label="item.label"
				></el-table-column>
				<el-table-column label="操作" width="100">
                    <template #default="scope">
                        <el-button size="small" type="text">编辑</el-button>
                        <el-button size="small" type="text">删除</el-button>
                    </template>
                </el-table-column>
			</el-table>
		</div>
	</div>
</template>

<style></style>
