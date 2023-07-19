<script setup>
import { reactive, ref, onMounted, getCurrentInstance, withCtx } from 'vue'
import {} from 'vue-router'
onMounted(() => {
	getTableData()
	getDeptList()
	getRoleAllList()
})
const form = ref(null)
const dialogForm = ref(null)
const { proxy } = getCurrentInstance()
let action = ref('add')
const user = reactive({
	userId: '',
	userName: '',
	state: 1,
})

// 新增弹框显示控制
const showModal = ref(false)
// 新增用户 form对象
const userForm = reactive({})
const tableData = reactive([])
const pager = reactive({
	pageNum: 1,
	pageSize: 10,
})
// 选中用户列表的对象
const checkedUserIds = ref([])
// 定义表单校验规则
const rules = reactive({
	userName: [
		{
			required: true,
			message: '请输入用户名称',
			trigger: 'blur',
		},
	],
	userEmail: [
		{
			required: true,
			message: '请输入用户邮箱',
			trigger: 'blur',
		},
	],
})
// 表格格式
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
		formatter(row, column, value) {
			return {
				0: '管理员',
				1: '普通用户',
			}[value]
		},
	},
	{
		label: '用户状态',
		prop: 'state',
		formatter(row, column, value) {
			return {
				1: '在职',
				2: '离职',
				3: '试用期',
			}[value]
		},
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
// 所有角色列表
const roleList = ref([])
// 所有部门列表
const deptList = ref([])
// 获取列表
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
const handleReset = (form) => {
	form.resetFields()
	// form.value.resetFields()
}
// 改变分页器页数触发事件
const handleCurrentChange = (val) => {
	// console.log(val);
	pager.pageNum = val
	// console.log(pager);
}
// 单个删除
const handleDelete = async (row) => {
	await proxy.$api.deleteUser({ userIds: [row.userId] })
	proxy.$message.success('删除成功')
	getTableData()
}
// 批量删除
const handlePatchDel = async () => {
	if (checkedUserIds.value.length === 0) {
		proxy.$message.error('请选择要删除的用户')
		return
	}
	// console.log(checkedUserIds.value);
	let res = await proxy.$api.deleteUser({ userIds: checkedUserIds.value })
	if (res.nModified > 0) {
		proxy.$message.success('删除成功')
		getTableData()
	} else {
		proxy.$message.error('删除失败')
	}
}
// 表格多选事件
const handleSelectionChange = (list) => {
	// console.log(list instanceof Array);
	let arr = []
	list.map((item) => {
		arr.push(item.userId)
	})
	checkedUserIds.value = arr
}
// 新增弹出框显示
const handleCreate = () => {
	action.value = 'add'
	showModal.value = true
}
// 获取部门列表
const getDeptList = async () => {
	let res = await proxy.$api.getDeptList()
	deptList.value = res
}
// 获取角色列表
const getRoleAllList = async () => {
	let res = await proxy.$api.getRoleAllList()
	roleList.value = res
}
// 用户取消
const handleClose = () => {
	showModal.value = false
	handleReset(dialogForm.value)
}
// 用户提交
const handleSubmit = () => {
	dialogForm.value.validate(async (valid) => {
		if (valid) {
			console.log({ ...userForm, action })
			let res = await proxy.$api.userSubmit({
				...userForm,
				action: action.value,
			})
			console.log(res)
			showModal.value = false
			proxy.$message.success('用户创建成功')
			handleReset(dialogForm.value)
			getTableData()
		}
	})
}
// 用户编辑
const handleEdit = (row) => {
	action.value = 'edit'
	console.log(row)
	showModal.value = true
	// DOM渲染完后，在填写内容
	proxy.$nextTick(() => {
		Object.assign(userForm, row)
	})
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
					<el-button @click="handleReset(form)">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="base-table">
			<div class="action">
				<el-button type="primary" @click="handleCreate">新增</el-button>
				<el-button type="danger" @click="handlePatchDel()"
					>批量删除</el-button
				>
			</div>

			<el-table
				:data="tableData"
				style="width: 100%"
				@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="50" />
				<el-table-column
					v-for="item in columns"
					:key="item.prop"
					:prop="item.prop"
					:label="item.label"
					:formatter="item.formatter"
				></el-table-column>
				<el-table-column label="操作" width="150">
					<template #default="scope">
						<el-button
							size="small"
							type="primary"
							@click="handleEdit(scope.row)"
							>编辑</el-button
						>
						<el-button
							type="danger"
							size="small"
							@click="handleDelete(scope.row)"
							>删除</el-button
						>
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
		<!-- 用户新增弹出框 -->
		<el-dialog v-model="showModal" title="用户新增">
			<el-form
				ref="dialogForm"
				:model="userForm"
				label-width="100px"
				:rules="rules"
			>
				<el-form-item label="用户名" prop="userName">
					<el-input
						v-model="userForm.userName"
						placeholder="请输入用户名称"
						:disabled="action === 'edit'"
					></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="userEmail">
					<el-input
						v-model="userForm.userEmail"
						placeholder="请输入用户邮箱"
					></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="mobile">
					<el-input
						v-model="userForm.mobile"
						placeholder="请输入用户电话"
					></el-input>
				</el-form-item>
				<el-form-item label="岗位" prop="job">
					<el-input
						v-model="userForm.job"
						placeholder="请输入用户岗位"
					></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="state">
					<el-select v-model="userForm.state">
						<el-option value="1" label="在职"></el-option>
						<el-option value="2" label="离职"></el-option>
						<el-option value="3" label="试用期"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="系统角色" prop="roleList">
					<el-select
						v-model="userForm.roleList"
						placeholder="请选择用户角色"
						multiple
						style="width: 100%"
					>
						<el-option
							v-for="role in roleList"
							:key="role._id"
							:label="role.roleName"
							:value="role.roleName"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="部门" prop="deptId">
					<el-cascader
						v-model="userForm.deptId"
						placeholder="请选择所在部门"
						:options="[...deptList]"
						:props="{
							checkStrictly: true,
							value: '_id',
							label: 'deptName',
						}"
						@change="handleChange"
						clearable
					/>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="handleClose">取消</el-button>
					<el-button type="primary" @click="handleSubmit">
						确认
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<style></style>
