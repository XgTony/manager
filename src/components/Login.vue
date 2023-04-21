<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const { proxy } = getCurrentInstance()
const goHome = () => {
	router.push('/welcome')
}
onMounted(() => {
	proxy
		.$request({
			method: 'get',
			url: '/login',
			data: {
				name: 'jack',
			},
		})
		.then((result) => {})
		.catch((err) => {})
  proxy.$storage.setItem('adc',{name:'loj1'})
  proxy.$storage.clearItem('manage')
    
})
</script>

<template>
	<h1 @click="goHome">Login</h1>
</template>

<style scoped></style>
