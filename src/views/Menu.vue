<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'

onMounted(() => {
	getMenuList()
})
let showModal = ref(false)
const dialogForm = ref(null)
let action = ''
const { proxy } = getCurrentInstance()
const queryForm = reactive({
	menuName: '',
	menuState: 1,
})
const rules = reactive({
	menuName: [
		{
			required: true,
			message: '请输入菜单名称',
			trigger: ['blur'],
		},
		{
			min: 2,
			max: 10,
			message: '长度2-10字符',
			trigger: ['blur'],
		},
	],
})
const menuList = reactive([])
const menuForm = reactive({ parentId: [null], menuType: 1, menuState: 1 })
// 控制弹窗显示

const columns = reactive([
	{
		label: '菜单名称',
		prop: 'menuName',
		width: 260,
	},
	{
		label: '图标',
		prop: 'icon',
	},
	{
		label: '菜单类型',
		prop: 'menuType',
		formatter(row, column, value) {
			return {
				1: '菜单',
				2: '按钮',
			}[value]
		},
	},
	{
		label: '权限标识',
		prop: 'menuCode',
	},
	{
		label: '路由地址',
		prop: 'path',
	},
	{
		label: '组件路径',
		prop: 'component',
	},
	{
		label: '菜单状态',
		prop: 'menuState',
		formatter(row, column, value) {
			return {
				1: '正常',
				2: '停用',
			}[value]
		},
		width: '60',
	},
	{
		label: '创建时间',
		prop: 'createTime',
		formatter(row, column, value) {
			return value.substring(0, 10)
		},
	},
])
// 发送请求获取menuList列表
const getMenuList = async () => {
	try {
		let list = await proxy.$api.getMenuList(queryForm)
		// menuList.value = [...list]
		list.forEach((item) => {
			menuList.push(item)
		})
		console.log(menuList)
	} catch (error) {
		throw new error()
	}
}
// 查询函数
const handleQuery = () => {}
// 重置
const handleReset = (form) => {
	showModal.value = false
	form.resetFields()
}
// 新增
const handleAdd = (type, row) => {
	showModal.value = true
	action = 'add'

	// 直接新增
	if (type === 1) {
	} else if (type === 2) {
		menuForm.parentId = [...row.parentId, row._id].filter((item) => item)
	}
}
// 编辑
const handleEdit = () => {}
// 删除
const handleDelete = () => {}
// 取消
const handleClose = () => {
	showModal.value = false
	handleReset(dialogForm.value)
}
const handleSubmit = () => {
	dialogForm.value.validate(async (valid) => {
		if (valid) {
			let params = { ...menuForm, action }
			let res = await proxy.$api.menuSubmit(params)
			showModal.value = false
			proxy.$message.success('添加成功')
			handleReset(dialogForm.value)
			getMenuList()
		}
	})
}
</script>
<template>
	<div class="user-manage">
		<div class="query-form">
			<el-form :inline="true" :model="queryForm" ref="form">
				<el-form-item label="菜单名称" prop="menuName">
					<el-input
						v-model="queryForm.menuName"
						placeholder="请输入菜单名称"
					></el-input>
				</el-form-item>
				<el-form-item label="用户名称" prop="menuState">
					<el-select
						v-model="queryForm.menuState"
						placeholder="请输入菜单状态"
					>
						<el-option :value="1" label="正常"></el-option>
						<el-option :value="2" label="停用"></el-option>
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
				<el-button type="primary" @click="handleAdd(1)">新增</el-button>
			</div>

			<el-table :data="menuList" style="width: 100%" row-key="_id">
				<el-table-column
					v-for="item in columns"
					:key="item.prop"
					:prop="item.prop"
					:label="item.label"
					:formatter="item.formatter"
				></el-table-column>
				<el-table-column label="操作" width="200">
					<template #default="scope">
						<el-button
							size="small"
							type="primary"
							@click="handleAdd(2, scope.row)"
							>新增</el-button
						>
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
		</div>
		<!-- 新增弹框 -->
		<!-- v-model="showModal"  -->
		<el-dialog v-model="showModal" title="用户新增">
			<el-form
				ref="dialogForm"
				:model="menuForm"
				label-width="100px"
				:rules="rules"
			>
				<el-form-item label="父级菜单" prop="parentId">
					<el-cascader
						v-model="menuForm.parentId"
						:options="menuList"
						:props="{
							checkStrictly: true,
							value: '_id',
							label: 'menuName',
						}"
						clearable
					></el-cascader>
					<span>不选，则直接创建一级菜单</span>
				</el-form-item>
				<el-form-item label="菜单类型" prop="menuType">
					<el-radio-group v-model="menuForm.menuType">
						<el-radio :label="1">菜单</el-radio>
						<el-radio :label="2">按钮</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item
					label="菜单名称"
					prop="menuName"
					v-show="menuForm.menuType == 1"
				>
					<el-input
						v-model="menuForm.menuName"
						placeholder="请输入菜单名称"
					></el-input>
				</el-form-item>

				<el-form-item
					label="菜单图标"
					prop="icon"
					v-show="menuForm.menuType == 1"
				>
					<el-input
						v-model="menuForm.icon"
						placeholder="请输入菜单图标"
					></el-input>
				</el-form-item>

				<el-form-item label="路由地址" prop="path">
					<el-input
						v-model="menuForm.path"
						placeholder="请输入路由地址"
					></el-input>
				</el-form-item>

				<el-form-item
					label="权限标识"
					prop="menuCode"
					v-show="menuForm.menuType == 2"
				>
					<el-input
						v-model="menuForm.menuCode"
						placeholder="请输入权限标识"
					></el-input>
				</el-form-item>
				<el-form-item
					label="组件路径"
					prop="component"
					v-show="menuForm.menuType == 1"
				>
					<el-input
						v-model="menuForm.component"
						placeholder="请输入组件路径"
					></el-input>
				</el-form-item>
				<el-form-item
					label="菜单状态"
					prop="menuState"
					v-show="menuForm.menuType == 1"
				>
					<el-radio-group v-model="menuForm.menuState">
						<el-radio :label="1">正常</el-radio>
						<el-radio :label="2">停用</el-radio>
					</el-radio-group>
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
