<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue'
const { proxy } = getCurrentInstance()
onMounted(() => {
	getDeptList()
	getUserList()
})
let queryForm = ref({
	deptName: '',
})
// 弹出框表单 ref
const dialogForm = ref(null)
let action = ref('create')
let showModal = ref(false)
// 部门负责人列表
const userList = ref([])
const columns = ref([
	{
		label: '部门名称',
		prop: 'deptName',
	},
	{
		label: '负责人',
		prop: 'userName',
	},
	{
		label: '更新时间',
		prop: 'updateTime',
		formatter(row, column, value) {
			return value.substring(0, 10)
		},
	},
	{
		label: '创建时间',
		prop: 'createTime',
		formatter(row, column, value) {
			return value.substring(0, 10)
		},
	},
])
const deptList = ref([])
const deptForm = ref([])
const rules = ref({
	parentId: [
		{
			required: true,
			message: '请选择上级部门',
			trigger: 'blur',
		},
	],
	deptName: [
		{
			required: true,
			message: '请输入部门名称',
			trigger: 'blur',
		},
	],
	user: [
		{
			required: true,
			message: '请选择负责人',
			trigger: 'blur',
		},
	],
})
// 获取部门列表
const getDeptList = async () => {
	let res = await proxy.$api.getDeptList()
	// console.log(res)
	deptList.value = res
}
const getUserList = async () => {
	let res = await proxy.$api.getAllUserList()
	console.log(res)
	userList.value = res
}
const handleReset = () => {
	queryForm.value.deptName = ''
}
// 编辑
const handleEdit = (row) => {
	action.value = 'edit'
	showModal.value = true
	let { parentId, deptName, userName: user, userEmail } = row
	let params = { parentId, deptName, user, userEmail }
	proxy.$nextTick(() => {
		deptForm.value = params
	})
}
// 创建
const handleCreate = () => {
	action.value = 'create'
	showModal.value = true
}
// 弹出框关闭
const handleDialogClose = () => {
	showModal.value = false
	dialogForm.value.resetFields()
}
// 删除
const handleDelete = (row) => {
	action.value = 'delete'
	let params = { id: row.userId, action: action.value }
	// console.log(params)
	//let res = await proxy.$api.deptOperate(params)
	proxy.$message.success('删除成功')
	getDeptList()
}
// 弹出框提交
const handleDialogSubmit = () => {
	dialogForm.value.validate(async (val) => {
		if (val) {
			let params = { ...deptForm.value, action: action.value }
			delete params.user
			let res = await proxy.$api.deptOperate(params)
			// console.log(res)
			proxy.$message.success('操作成功')
			handleDialogClose()
			getDeptList()
		} else {
		}
	})
}
// 用户选择触发事件
const handleUser = (value) => {
	console.log(value)
	const [userId, userName, userEmail] = value.split('/')
	Object.assign(deptForm.value, {
		userId,
		userName,
		userEmail,
	})
}
</script>
<template>
	<div class="dept-manage">
		<div class="query-form" ref="" :model="queryForm">
			<el-form :inline="true">
				<el-form-item label="部门名称"
					><el-input
						placeholder="请输入部门名称"
						v-model="queryForm.deptName"
					></el-input
				></el-form-item>
				<el-form-item
					><el-button type="primary" @click="getDeptList"
						>查询</el-button
					>
					<el-button @click="handleReset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="base-table">
			<div class="action">
				<el-button type="primary" @click="handleCreate">创建</el-button>
			</div>
			<el-table
				:data="deptList"
				row-key="_id"
				:tree-props="{ children: 'children' }"
			>
				<el-table-column
					v-for="item in columns"
					:key="item.prop"
					v-bind="item"
				>
				</el-table-column>
				<el-table-column label="操作">
					<template #default="scope">
						<el-button type="primary" @click="handleEdit(scope.row)"
							>编辑</el-button
						>
						<el-button
							type="danger"
							@click="handleDelete(scope.row)"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog
			:title="action === 'create' ? '创建部门' : '编辑部门'"
			v-model="showModal"
		>
			<el-form
				ref="dialogForm"
				:model="deptForm"
				:rules="rules"
				label-width="120px"
			>
				<el-form-item prop="parentId" label="上级部门">
					<el-cascader
						placeholder="请选择上级部门"
						v-model="deptForm.parentId"
						clearable
						:props="{
							checkStrictly: true,
							value: '_id',
							label: 'deptName',
						}"
						:options="deptList"
						:show-all-levels="true"
					></el-cascader>
				</el-form-item>
				<el-form-item label="部门名称" prop="deptName">
					<el-input
						placeholder="请输入部门名称"
						v-model="deptForm.deptName"
					></el-input>
				</el-form-item>
				<el-form-item label="部门负责人" prop="user">
					<el-select
						placeholder="请选择部门负责人"
						v-model="deptForm.user"
						@change="handleUser"
					>
						<el-option
							v-for="item in userList"
							:key="item.userId"
							:label="item.userName"
							:value="`${item.userId}/${item.userName}/${item.userEmail}`"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="负责人邮箱" prop="userEmail">
					<el-input
						placeholder="请输入负责人邮箱"
						v-model="deptForm.userEmail"
						disabled
					></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="handleDialogClose">取消</el-button>
					<el-button type="primary" @click="handleDialogSubmit">
						确认
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
