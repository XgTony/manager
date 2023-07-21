<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
// 用于获取全局方法 $api,$request...
const { proxy } = getCurrentInstance()
// 获取 userForm DOM
const store = useStore()
const userForm = ref(null)
const router = useRouter()
const data = reactive({})
const user = reactive({
	userName: 'admin',
	userPwd: '1234',
})
const rules = reactive({
	userName: [
		{
			required: true,
			message: '请输入用户名',
			trigger: 'blur',
		},
	],
	userPwd: [
		{
			required: true,
			message: '请输入密码',
			trigger: 'blur',
		},
	],
})
onMounted(() => {})
const login = () => {
	// console.log(user)
	// 表单是否全部填写，valid=true,全部填写
	userForm.value.validate((valid) => {
		if (valid) {
			proxy.$api.login(user).then((res) => {
				console.log(res)
				// console.log(store);
				store.commit('saveUserInfo', res)
				router.push('/welcome')
			})
		} else {
			return false
		}
	})
}
</script>

<template>
	<div class="login-wrapper">
		<div class="modal">
			<el-form ref="userForm" :model="user" status-icon :rules="rules">
				<div class="title">OA后台管理系统</div>
				<div class="form">
					<el-form-item prop="userName">
						<el-input
							type="text"
							v-model="user.userName"
							size="large"
							disabled
						>
							<template #prefix>
								<el-icon><User /></el-icon>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="userPwd">
						<el-input
							type="password"
							v-model="user.userPwd"
							size="large"
							disabled
						>
							<template #prefix>
								<el-icon><View /></el-icon>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							class="btn-login"
							@click="login"
							size="large"
							>登录</el-button
						>
					</el-form-item>
				</div>
			</el-form>
		</div>
	</div>
</template>

<style lang="scss">
.login-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	// background-color: #f9fcff;
	background: #456;
	font-family: 'Open Sans', sans-serif;
	width: 100vw;
	height: 100vh;
	.modal {
		width: 500px;
		padding: 50px;
		background-color: #fff;
		border-radius: 4px;
		box-shadow: 0px 0px 10px 3px #c7c9cb4d;
		text-align: center;
		.title {
			font-size: 30px;
			line-height: 1.5;
			text-align: center;
			margin-bottom: 30px;
		}
		.form {
			.btn-login {
				width: 100%;
			}
		}
	}
}
</style>
