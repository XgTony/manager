<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue'
// 获取Vue实例
const { proxy } = getCurrentInstance()
// 获取数据
onMounted(() => {
	getRoleList()
	getMenuList()
})
// 查询角色名字
const queryForm = reactive({
	roleName: '',
})
// 分页器默认参数
const pager = ref({
	pageSize: 10,
	total: 0,
})
// 角色表单验证规则
const rules = ref({
	roleName: [
		{
			required: true,
			message: '请输入角色名称',
		},
	],
})
// 角色表单
const roleForm = ref({
	roleName: '',
	remark: '',
})
// 角色列表
const roleList = ref([])
// 表单头
const columns = ref([
	{
		label: '角色名称',
		prop: 'roleName',
	},
	{
		label: '备注',
		prop: 'remark',
	},
	{
		label: '权限列表',
		prop: 'permissonList',
		formatter(row, column, value) {
			let names = []
			let list = row.permissionList.halfCheckedKeys || []
			list.map((key) => {
				if (key) {
					names.push(actionMaps.value[key])
				}
			})
			return names.join(' ')
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
// 提交动作，add新增，edit编辑
let action = ref('add')
// 获取表单ref
let dialogForm = ref(null)
// 获取permissionTree 的ref
let treeRef = ref(null)
// 弹框tittle
let dialogTittle = ref('角色新增')
// 权限弹框下角色名称
let currentRoleName = ref('')
// 新增，编辑弹框控制变量
let showModal = ref(false)
// 权限弹框控制变量
let promessionFlag = ref(false)
// 权限列表
const menuList = ref([])
// 权限选项
const actionMaps = ref({})
/**
 * 以下是函数
 */

// 获取角色列表
const getRoleList = async () => {
	let res = await proxy.$api.getRoleList(queryForm)
	roleList.value = res.list
	pager.total = res.page.total
}
// 获取菜单列表
const getMenuList = async () => {
	let res = await proxy.$api.getMenuList()
	console.log(res)
	menuList.value = res
	// proxy.$nextTick(() => {
	//
	// })
	// console.log(menuList.value)
	// setTimeout(() => {
	// 	getActionMap([...res])
	// }, 1000)
}
// 查询
const handleQuery = () => {}
// 重置
const handleReset = () => {
	queryForm.roleName = ''
}

// 新增角色
const handleAdd = () => {
	showModal.value = true
	action.value = 'add'
	dialogTittle.value = '角色新增'
}
// 编辑角色
const handleEdit = (row) => {
	roleForm.value = row
	showModal.value = true
	action.value = 'edit'
	dialogTittle.value = '角色编辑'
}
// 编辑权限
const handlePermission = (row) => {
	promessionFlag.value = true
	currentRoleName.value = row.roleName
	let { checkedKeys } = row.permissionList
	proxy.$nextTick(() => {
		treeRef.value.setCheckedKeys(checkedKeys)
	})
}
// 删除
const handleDelete = (row) => {
	proxy.$message.success('删除成功')
	getMenuList()
}
// 新增、编辑弹框关闭
const handleClose = () => {
	showModal.value = false
	roleForm.value = {
		roleName: '',
		remark: '',
	}
}
// 新增、编辑弹框提交
const handleSubmit = () => {
	dialogForm.value.validate(async (vaild) => {
		if (vaild) {
			let params = {
				...roleForm.value,
				action: action.value,
			}
			// 提交请求
			let res = await proxy.$api.roleSubmit(params)
			proxy.$message.success(dialogTittle.value + '成功')
			showModal.value = false
			roleForm.value = {
				roleName: '',
				remark: '',
			}
			getRoleList()
		} else {
			proxy.$message.error('信息填写不完整')
		}
	})
}
// 权限控制弹框关闭
const permissionClose = () => {
	promessionFlag.value = false
}
// 权限控制弹窗提交
const permissionSubmit = async () => {
	let keys = treeRef.value.getCheckedKeys()
	let res = await proxy.$api.updatePermission(keys)
	proxy.$message.success('修改成功')
	promessionFlag.value = false
}
// 获取权限选项
const getActionMap = (list) => {
	console.log(list)

	let actionMap = {}
	const deep = (arr) => {
		while (arr.length) {
			let item = arr.pop()
			if (item.children && item.action) {
				actionMap[item._id] = item.menuName
			}
			if (item.children && !item.action) {
				deep(item.children)
			}
		}
	}
	deep(list)

	actionMaps.value = actionMap
	console.log(actionMaps.value)
}
</script>
<template>
	<div class="role-manage">
		<div class="query-form">
			<el-form :inline="true" :model="queryForm" ref="form">
				<el-form-item label="角色名称" prop="roleName">
					<el-input
						v-model="queryForm.roleName"
						placeholder="请输入菜单名称"
					></el-input>
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
				<el-button type="primary" @click="handleAdd">创建</el-button>
			</div>

			<el-table :data="roleList" style="width: 100%">
				<el-table-column
					v-for="item in columns"
					:key="item.prop"
					:prop="item.prop"
					:label="item.label"
					:formatter="item.formatter"
				></el-table-column>
				<el-table-column label="操作" width="300">
					<template #default="scope">
						<el-button
							size="small"
							type="primary"
							@click="handleEdit(scope.row)"
							>编辑</el-button
						>
						<el-button
							size="small"
							type="primary"
							@click="handlePermission(scope.row)"
							>设置权限</el-button
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
				layout="prev, pager, next"
				:total="pager.total"
				:page-size="pager.pageSize"
			></el-pagination>
		</div>
		<!-- 新增弹框 -->
		<el-dialog v-model="showModal" :title="dialogTittle">
			<el-form
				ref="dialogForm"
				:model="roleForm"
				label-width="100px"
				:rules="rules"
			>
				<el-form-item label="角色名称" prop="roleName">
					<el-input
						v-model="roleForm.roleName"
						placeholder="请输入角色名称"
					></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input
						type="textarea"
						:rows="2"
						v-model="roleForm.remark"
						placeholder="请输入备注信息"
					></el-input>
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
		<!-- 权限弹框 -->
		<el-dialog title="权限编辑" v-model="promessionFlag">
			<el-form ref="promessionForm" label-width="100px">
				<el-form-item label="角色名称"
					>{{ currentRoleName }}
				</el-form-item>
				<el-form-item label="选择权限">
					<el-tree
						ref="treeRef"
						:data="menuList"
						show-checkbox
						node-key="_id"
						highlight-current
						:props="{ label: 'menuName' }"
						default-expand-all
					/>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="permissionClose">取消</el-button>
					<el-button type="primary" @click="permissionSubmit">
						确认
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
